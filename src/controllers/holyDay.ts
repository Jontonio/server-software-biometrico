import {Request, Response } from "express";
import { ResponseServer } from "../class/Response";
import { HolyDays } from "../models/HolyDays";
import { IEShiftHolyDay } from "../models/InstitutionShiftHolyDay";
import { Op, Sequelize } from "sequelize";

export const addNewHolyDay = async ( req:Request, res:Response) => {
    try {
        const { body } = req;
        const holyDay = await HolyDays.create( body );
        return res.status(200).json( new ResponseServer('Evento registrado correctamente', true, holyDay))
    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al registrar nuevo evento', false))
    }
}

export const assignPrivateHolyDay = async ( req:Request, res:Response) => {
    try {
        const { body } = req;
        const IEPrivateHolyDay = await IEShiftHolyDay.create( body );
        return res.status(200).json( new ResponseServer('Evento registrado correctamente', true, IEPrivateHolyDay))
    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al registrar nuevo evento', false))
    }
}

export const addIEHolyDays = async ( req:Request, res:Response) => {
    try {
        const { holyDays } = req.body;
        
        let countAdd = 0; 
        let countUpdate = 0; 

        for(let { month, day, InstitutionShiftIdInstitutionShift, HolyDayIdHolyDay, status } of holyDays){
            const year = new Date().getFullYear();
            const formattedMonth = month < 10 ? `0${month}` : `${month}`;
            const formattedDay = day < 10 ? `0${day}` : `${day}`;
            const date = `${year}-${formattedMonth}-${formattedDay}`;
            const oneIEHolyDay = await IEShiftHolyDay.findOne({
                where:{ 
                    InstitutionShiftIdInstitutionShift, 
                    HolyDayIdHolyDay,
                    date: {
                        [Op.gte]: new Date(`${date}T00:00:00.000Z`),
                        [Op.lte]: new Date(`${date}T23:59:59.999Z`),
                    }
                } 
            })

            if(oneIEHolyDay){
                //TODO: update holy day
                const resHolyDay = await oneIEHolyDay.set({ date, status }).save();
                countUpdate++;
            }else {
                const addNewHolyDay = await IEShiftHolyDay.create({date, status, InstitutionShiftIdInstitutionShift, HolyDayIdHolyDay })
                countAdd++;
            }

        }
        return res.status(200).json( new ResponseServer(`Eventos guardados correctamente, se añadieron ${countAdd} elementos y se actualizaron ${countUpdate} elementos`, true))
    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al registrar nuevos eventos en la institución', false))
    }
}

export const getHolyDays = async ( req:Request, res:Response) => {
    try {
        const { offset = 0, limit = 5, year = new Date().getFullYear() } = req.query;

        const holyDays = await HolyDays.findAndCountAll({
            where:{ status:true, isGlobal:true },
            offset:Number(offset),
            limit:Number(limit),
            order:[['month','ASC'],['day','ASC']]
        });
        
        const holyDaysWithYear = holyDays.rows.map((holyDay) => {
            return {
              ...holyDay.get(), 
              year: year
            };
        });
          
        // Devolver la respuesta con el array modificado
        const response = {
            count: holyDays.count,
            rows: holyDaysWithYear,
        };
        return res.status(200).json( new ResponseServer('Lista de enventos registrados', true, response))
    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al obtener lista de eventos', false))
        
    }
}

export const getOneIEShiftHolyDays = async ( req:Request, res:Response) => {
    try {
        const { id_institution_shift } = req.params;
        const { offset = 0, limit = 5, isGlobal = 1 } = req.query;
        const year = new Date().getFullYear();
        const holyDays = await HolyDays.findAndCountAll({
            where: {
              status: true,
              isGlobal:+isGlobal
            },
            include: [
              {
                model: IEShiftHolyDay,
                where: {
                  InstitutionShiftIdInstitutionShift: id_institution_shift,
                  date: {
                    [Op.between]: [
                      new Date(`${year}-01-01`),
                      new Date(`${year}-12-31T23:59:59.999Z`),
                    ],
                  }
                },
                required: false,
              },
            ],
            offset: +offset,
            limit: +limit,
        });

        const holyDaysWithYear = holyDays.rows.map((holyDay) => {
            return {
              ...holyDay.get(), 
              year: year
            };
        });
          
        // Devolver la respuesta con el array modificado
        const response = {
            count: holyDays.count,
            rows: holyDaysWithYear,
        };
        
        return res.status(200).json( new ResponseServer('Lista de enventos registrados', true, response))

    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al obtener lista de eventos', false))
        
    }
}

export const getAssignEShiftHolyDays = async ( req:Request, res:Response) => {
    try {
        const { id_institution_shift } = req.params;
        const { offset = 0, limit = 5, isGlobal = 1 } = req.query;

        const year = new Date().getFullYear();

        const holyDaysIE = await IEShiftHolyDay.findAndCountAll({
            where: {
              InstitutionShiftIdInstitutionShift: id_institution_shift,
            },
            include:[
                {
                    model:HolyDays,
                    where:{ status:true, isGlobal }
                }
            ],
            offset: +offset,
            limit: +limit,
        });

        return res.status(200).json( new ResponseServer('Lista de enventos registrados', true, holyDaysIE))

    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al obtener lista de eventos', false))
        
    }
}

export const updateHolyDay = async ( req:Request, res:Response) => {
    try {
        
        const { id_holy_day } = req.params;
        const { body } = req;

        const holyDay = await HolyDays.findOne({
            where:{ id_holy_day }
        });
        const resUpdate = await holyDay?.set( body ).save();
        return res.status(200).json( new ResponseServer('Evento actualizado correctamente', true, resUpdate))
    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al actualizar evento', false))
    }
}

export const deleteHolyDay = async ( req:Request, res:Response) => {
    try {

        const { id_holy_day } = req.params;

        const holyDay = await HolyDays.findOne({
            where:{ id_holy_day }
        });
        const resUpdate = await holyDay?.set({ status:false }).save();
        return res.status(200).json( new ResponseServer('Evento elimnado correctamente', true, resUpdate))
    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al eliminar evento', false))
    }
}
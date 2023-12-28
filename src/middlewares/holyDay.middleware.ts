import { NextFunction, Request, Response } from "express";
import { ResponseServer } from "../class/Response";
import { HolyDays } from "../models/HolyDays";
import { IEShiftHolyDay } from "../models/InstitutionShiftHolyDay";
import { Op, Sequelize } from "sequelize";
import moment from "moment";

export const existSomeHolyDay = async (req: Request, res:Response, next:NextFunction) => {

    try {
        const { name } = req.body;

        if( !name ){
            return res.status(500).json( new ResponseServer(`El nombre del evento es requerido`, false))
        }

        const holyDay = await HolyDays.findOne({
            where:{ name }
        });

        if( holyDay ){
            return res.status(500).json( new ResponseServer(`El evento ${name} ya se encuentra registrado, registre uno nuevo.`, false))
        }

        next();

    } catch (e:any) {
        console.log(e)
        return res.status(500).json( new ResponseServer(`Error en el servidor`, false))
    }
}

export const existIdHolyDay = async (req: Request, res:Response, next:NextFunction) => {

    try {
        const { id_holy_day } = req.params;

        if( !id_holy_day ){
            return res.status(500).json( new ResponseServer(`El id del evento es requerido`, false))
        }

        const holyDay = await HolyDays.findOne({
            where:{ id_holy_day }
        });

        if( !holyDay ){
            return res.status(500).json( new ResponseServer(`El evento con id ${id_holy_day} no se encuentra registrado`, false))
        }

        next();

    } catch (e:any) {
        console.log(e)
        return res.status(500).json( new ResponseServer(`Error en el servidor middleware (holyDay)`, false))
    }
}

export const existAssignPrivateHolyDay =  async (req:Request, res:Response, next:NextFunction) => {
    
    const { HolyDayIdHolyDay, InstitutionShiftIdInstitutionShift, date } = req.body;
    const formatDate = moment(date).format("YYYY-MM-DD");
    const oneIEHolyDay = await IEShiftHolyDay.findOne({
        where:{ 
            InstitutionShiftIdInstitutionShift, 
            HolyDayIdHolyDay,
            date: {
                [Op.gte]: new Date(`${formatDate}T00:00:00.000Z`),
                [Op.lte]: new Date(`${formatDate}T23:59:59.999Z`),
            }
        } 
    })

    if(oneIEHolyDay){
        return res.status(500).json( new ResponseServer(`El nuevo evento a registrar ya se encuentra registrado`, false))
    }

    next();
}
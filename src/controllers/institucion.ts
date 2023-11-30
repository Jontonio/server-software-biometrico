import { Request, Response } from "express"
import { ResponseServer } from "../class/Response";
import { institutionData } from "../resources/dataInstituciones";
import { Institution, Staff, TypeStaff, InstitutionStaff, WorkScheduleInstitution } from "../models";
import { InstitutionShift } from "../models/InstitutionShift";
import { Shift } from "../models/Shift";

export const getInstitutions = async (req:Request, res: Response)=> {
    try {
        const {  offset = 0, limit = 5 } = req.query;

        const institutions = await Institution.findAndCountAll({
            distinct:true,
            where:{ status:true },
            attributes:{ exclude:['updatedAt'] },
            offset:Number(offset),
            limit:Number(limit),
            order:[['createdAt','DESC']],
            include:[
                {
                    model: InstitutionShift,
                    include:[
                        {
                            model:Shift,
                            attributes:{ exclude:['createdAt','updatedAt'] },
                        }
                    ],
                    order:[[InstitutionShift, 'createdAt','DESC']],
                },
            ]
        });

        return res.status(200).json( new ResponseServer('Lista de instituciones', true, institutions ))

    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al obtener instituciones', false, null))
    }
}

export const getOneInstitution = async (req:Request, res: Response)=> {
    try {
        // get modular code from institution
        const { modular_code } = req.params;
        // find one institution with modular code
        const institution = await Institution.findOne({ 
            where:{ modular_code },
            include:[
                {
                    model:InstitutionShift,
                    include:[
                        {
                            model:Shift
                        }
                    ]
                }
            ]
        });
        return res.status(200).json( new ResponseServer('Obtener una institución', true, institution ))

    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al obtener una institución', false, null))
    }
}

export const getOneInstitutionWithShift = async (req:Request, res: Response)=> {
    try {
        // get modular code from institution
        const { id_institution_shift } = req.params;
        // find one institution with modular code
        const institutionShift = await InstitutionShift.findOne({ 
            where:{ id_institution_shift },
            include:[
                {
                    model:Shift,
                    attributes:{ exclude:['createdAt','updatedAt'] }
                },
                {
                    model:Institution,
                    attributes:{ exclude:['createdAt','updatedAt'] }
                }
            ],
            attributes:{exclude:['createdAt','updatedAt']}
        });
        return res.status(200).json( new ResponseServer('Obtener una institución con turno', true, institutionShift ))

    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al obtener una institución con turno', false, null))
    }
}

export const updateInstitution = async (req:Request, res: Response) => {
    try {
        // get modular code from params
        const { modular_code } = req.params;
        const { body } = req;
        // find one intitution with modular code
        const institution = await Institution.findOne({ 
            where:{ modular_code }
        })
        // update institution
        const respInstitution = await institution!.set( body ).save();

        // const institutionShift = await Institution.findOne({
        //     where:{ modular_code },
        //     include:[
        //       {
        //         model:InstitutionShift,
        //         where:{ ShiftIdShift:body.shift }
        //       }
        //     ]
        // });
        //TODO:pendiente actualización de datos
        // if(!institutionShift){
        //     const id_institution_shift = body.shift;
        //     const IEShift = await InstitutionShift.findByPk(id_institution_shift);
        //     IEShift?.set({ShiftIdShift: })
        // }
        // return response message
        return res.status(200).json( new ResponseServer('Institución actualizada correctamente', true, respInstitution ))

    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al actualizar la institución', false, null))
    }
}

export const registerInstitution = async (req:Request, res: Response)=> {
    try {
        // get body data from request
        const { body } = req;
        const { modular_code, shift } = body
        const existInstitution = await Institution.findByPk(modular_code);
        // verif if exist institution, if exist create
        if(!existInstitution){
            await Institution.create( body );
        }
        // register new institution shift
        const resInstitutionShift = await InstitutionShift.create({ ShiftIdShift:shift, InstitutionModularCode:modular_code })
        return res.status(201).json( new ResponseServer('Institución registrada correctamente', true, resInstitutionShift ))

    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al registrar institución', false, null))
    }
}

export const deleteInstitution = async (req:Request, res:Response)=> {
    try {
        // get modular code from params
        const { modular_code } = req.params;
        // find one institution with modular code
        const institution = await Institution.findOne({ 
            where:{ modular_code }
        })
        // update institution
        const respInstitution = await institution!.set({ status:false }).save();
        // return message response
        return res.status(201).json( new ResponseServer('Institución eliminada correctamente', true, respInstitution ))
        
    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al eliminar institución', false, null))
    }
}

export const getOneInstitutionWithStaff = async (req:Request, res: Response)=> {
    try {
        const { offset = 0, limit = 5} = req.query;
        // get modular code from params
        const { id_institution_shift } = req.params;
        // find one institution with modular code
        const institutionWithStaff = await InstitutionStaff.findAndCountAll({
            where:{ InstitutionShiftIdInstitutionShift: id_institution_shift },
            include:[
                {
                    model: Staff,
                    attributes:{ exclude:['createdAt','updatedAt'] }
                },
                {
                    model:WorkScheduleInstitution,
                    attributes:{ exclude:['createdAt','updatedAt'] }
                },
                {
                    model: TypeStaff,
                    attributes:{ exclude:['createdAt','updatedAt'] }
                }
            ],
            distinct:true,
            attributes:{ exclude:['createdAt','updatedAt'] },
            offset:Number(offset),
            limit:Number(limit)
        });
        return res.status(200).json( new ResponseServer('Obtener institución con personal', true, institutionWithStaff ))

    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al obtener una institución', false, null))
    }
}

export const getOneResourceInstitution = async ( req:Request, res:Response ) => {
    try {
        // get modular code from params
        const { modular_code } = req.params;
        // filter from specific modular code
        const institution = institutionData.find( (institucion:any) => institucion.modular_code == modular_code );
        // verify resp size 
        if(!institution){
            // return response message
            return res.status(404).json( new ResponseServer(`No se encontro ninguna institución con código modular ${modular_code}`, false))
        }
        // return response message
        return res.status(200).json( new ResponseServer(`Institución con código modular ${modular_code}`, true, { ...institution }))
    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al obtener insituciones', false))
    }
}

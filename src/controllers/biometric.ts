import { Request, Response } from "express";
import { ResponseServer } from "../class/Response";
import { Biometric } from "../models";

export const registerBiometric = async (req:Request, res: Response)=> {
    try {
        // get data grom body
        const { body } = req;
        // register new Attendance
        const biometric = await Biometric.create( body );
        // return response message
        return res.status(201).json( new ResponseServer('Biométrico registrado correctamente', true, biometric))
        
    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al registrar biométrico', false, null))
    }
}

export const getBiometricsFromAnInstitution = async (req:Request, res: Response)=> {
    try {
        const { modular_code } = req.params;
        // get list biometrics
        const biometrics = await Biometric.findAll({
            where: { InstitutionModularCode:modular_code, status:true }
        });
        // count biometrics
        const countBiometrics = await Biometric.count({
            where: { InstitutionModularCode:modular_code, status:true }
        });
        // return response message
        return res.status(200).json( new ResponseServer(`Lista de biometricos de la institución con código modular ${modular_code}`, true, biometrics, countBiometrics))

    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al obtener biométricos de la institución', false, null))
    }
}

export const getOneBiometric = async (req:Request, res: Response)=> {
    try {
        const { id_biometric } = req.params;
        // get one biometric
        const biometric = await Biometric.findOne({
            where:{ id_biometric, status:true }
        });
        // return response message
        return res.status(200).json( new ResponseServer(`Biométrico con Id ${id_biometric}`, true, biometric))

    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al obtener el biométrico', false, null))
    }
}

export const deleteBiometric = async (req:Request, res: Response)=> {
    try {
        const { id_biometric } = req.params;
        // find biometric
        const biometric = await Biometric.findOne({
            where: { id_biometric }
        });
        const respDeleteBiometric = await biometric?.set({ status: false }).save();
        // return response message
        return res.status(200).json( new ResponseServer(`Biométrico eliminado correctamente`, true, respDeleteBiometric))

    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al eliminar biométrico', false, null))
    }
}

export const updateBiometric = async (req:Request, res: Response)=> {
    try {
        const { id_biometric } = req.params;
        const { body } = req;
        // find biometri
        const biometric = await Biometric.findOne({
            where: { id_biometric }
        });
        const respUpdateBiometric = await biometric?.set( body ).save();
        // return response message
        return res.status(200).json( new ResponseServer(`Biométrico actualizado correctamente`, true, respUpdateBiometric))

    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al actualizar biométrico', false, null))
    }
}

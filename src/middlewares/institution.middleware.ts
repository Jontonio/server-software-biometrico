import { NextFunction, Request, Response } from "express";
import { Institution, InstitutionStaff, Staff } from "../models";
import { ResponseServer } from "../class/Response";
import { InstitutionShift } from "../models/InstitutionShift";

export const existInstitutionShift = async (req:Request, res:Response, next:NextFunction) => {

  const { shift, modular_code, name_IE, level_modality } = req.body;

  //find at the instituion
  const institutionShift = await Institution.findOne({
    where:{ modular_code },
    include:[
      {
        model:InstitutionShift,
        where:{ ShiftIdShift:shift }
      }
    ]
  });

  if(institutionShift){
    
    return res.status(400).json( new ResponseServer(`La institución ${name_IE} - ${level_modality} ya se encuentra registrado con ese turno`, false, null))

  }

  next();
}
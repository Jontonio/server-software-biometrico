import { NextFunction, Request, Response } from "express";
import { WorkSchedule } from "../models";
import { ResponseServer } from "../class/Response";

export const existWorkScheduleTime = async (req:Request, res:Response, next:NextFunction) => {

  const { arrival_time, departure_time } = req.body;

  //find at the instituion
  const institutionShift = await WorkSchedule.findOne({
    where:{ arrival_time, departure_time },
  });

  if(institutionShift){
    
    return res.status(400).json( new ResponseServer(`El horario laboral ya se encuentra registrado. Registe uno nuevo`, false))

  }

  next();
}
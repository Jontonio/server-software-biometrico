import { Request, Response } from "express";
import { ResponseServer } from "../class/Response";
import { countBiometrico, countInstitution, countJustification, countStaff } from "../utils/reports";
import connectDB from "../db/conexion";
import { QueryTypes, Sequelize } from "sequelize";
import { getDetailAttendances, queryInfoOneTypeJustification } from "../utils/query";
import { InstitutionShift } from "../models/InstitutionShift";
import { Institution, InstitutionStaff, Staff, TypeStaff, WorkScheduleInstitution } from "../models";
import { Shift } from "../models/Shift";
import { DayInfo, getDaysToMonth, transformArrayJustifications } from "../utils/generateArrayDate";
import moment from "moment";
import { TypeJustification } from "../models/TypeJustification";

export const counterInformation = async (req:Request, res: Response)=> {
    try {
        const list:any[] = [];
        // get information from intitution
        const dataIE = {
            "label":"Institución",
            "countActives": await countInstitution(true),
            "countInactives": await countInstitution(false),
            "name":"building",
            "color":"blue"
        }
        // get information from biometric
        const dataBiometric = {
            "label":"Biométrico",
            "countActives": await countBiometrico(true),
            "countInactives": await countBiometrico(false),
            "name":"tablet",
            "color":"green"
        }
        // get information from staff
        const dataStaff = {
            "label":"Personal",
            "countActives": await countStaff(true),
            "countInactives": await countStaff(false),
            "name":"briefcase",
            "color":"orange",
        }
        // get information from staff
        const dataJustification = {
            "label":"Justificación",
            "countActives": await countJustification(true),
            "countInactives": await countJustification(false),
            "name":"folder",
            "color":"indigo",
        }

        list.push(dataIE, dataBiometric, dataStaff, dataJustification)
        // return response message
        return res.status(200).json( new ResponseServer('Información registrada en el sistema SIREA', true, list ))

    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al obtener información de counter report', false, null))
    }
}
export const getInfoJustifications = async (req:Request, res:Response) => {
    try {
        const { year } = req.body;
        const dataJustify: any[] = [];
        const type_justifications = await TypeJustification.findAll({ where:{ status:true }});
        for(const value of type_justifications) {
            const data = await queryInfoOneTypeJustification(year, value.get('id_type_justification') as number);
            const values = transformArrayJustifications(value.get('type_justification') as string, data)
            dataJustify.push(values)
        }
        const message = `Conteo de información del tipo de justificación año ${2023}`;
        return res.status(200).json( new ResponseServer(message, true, dataJustify ))
    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al obtener reporte detallado', false, null))
    }
}

export const getDetailedReport = async (req:Request, res: Response)=> {
    try {

        const { year, month, id_institution_shift } = req.body;

        const institutionShift = await InstitutionShift.findOne({
            where:{ id_institution_shift },
            include:[
                {
                    model: InstitutionStaff,
                    where:{ status: true },
                    include:[
                        {
                            model:Staff,
                            attributes:{ exclude:['createdAt','updatedAt'] }
                        },
                        {
                            model:TypeStaff,
                            attributes:{ exclude:['createdAt','updatedAt'] }
                        },
                        {
                            model:WorkScheduleInstitution,
                            attributes:{ exclude:['createdAt','updatedAt'] }
                        }
                    ],
                    attributes:{ exclude:['createdAt','updatedAt'] },
                },
                {
                    model: Institution,
                    where:{ status: true },
                    attributes:{ exclude:['createdAt','updatedAt'] }
                },
                {
                    model: Shift,
                    where:{ status: true },
                    attributes:{ exclude:['createdAt','updatedAt'] }
                }
            ]
        })

        //TODO: require
        const idInstitutionShift:number = institutionShift?.get('id_institution_shift') as number;
        const institution = institutionShift?.get('Institution') as any;
        const shift = institutionShift?.get('Shift') as any;
        const listStaffAtTheInstition = institutionShift?.get('InstitutionStaffs') as any[];
        const listStaffReports = [];
        const daysToMonth = getDaysToMonth(year, month);
        
        for(const staff of listStaffAtTheInstition){

            const id_institution_staff = staff?.get('id_institution_staff');
            const reportStaff = staff?.get('Staff');
            const reportConditionStaff = staff?.get('staff_condition');
            const reportWorkingHoursStaff = staff?.get('working_hours');
            const reportTypeStaff = staff?.get('TypeStaff');
            const WorkScheduleInstitutions = staff?.get('WorkScheduleInstitutions');
            const resAttendances = await getDetailAttendances(idInstitutionShift, id_institution_staff, year, month);
            const daysToMonthAttendances = [...daysToMonth];

            const reportsAttendances = daysToMonthAttendances.map((day:DayInfo) => {

                const attendance:any = resAttendances.find((t:any) => t.day === day.dayNumber);

                if (attendance) {
                    return {
                            ...day,
                            statusAttendance: attendance.statusAttendance,
                            date_time: attendance.date_time,
                    };
                } else {

                    return {
                            ...day,
                            statusAttendance: WorkScheduleInstitutions.find((val:any) => val.day==day.numberStartDay)?'F':'_',
                            date_time: null,
                    };
                }
            });
            
            const data = {
                reportStaff,
                reportTypeStaff,
                reportConditionStaff,
                reportWorkingHoursStaff,
                reportsAttendances
            }

            listStaffReports.push(data);

        }

        const dataReprot = {
            daysToMonth,
            date: moment().format('DD/MM/YYYY'),
            month: moment().month(month - 1 ).format('MMMM').toUpperCase(),
            year,
            institution,
            shift,
            listStaffReports
        }

        // return response message
        return res.status(200).json( new ResponseServer(`Reporte detallado del mes ${month} del año ${year}`, true, dataReprot))

    } catch (e) {
        return res.status(500).json( new ResponseServer('Ocurrio un error al obtener reporte detallado', false, null))
    }
}

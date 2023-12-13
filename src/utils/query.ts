import { QueryTypes } from "sequelize";
import connectDB from "../db/conexion";


export const getDetailAttendances = async (
    id_institution_shift: number,
    id_institution_staff: number,
    year: number,
    month: number
  ) => {
    try {
      const resultado = await connectDB.query(`
        SELECT DISTINCT
            institution_staff.StaffIdCard AS id_card,
            attendances.date_time,
            DAY(attendances.date_time) AS day,
            CASE
                WHEN attendances.punch = 0 
                    AND DAYOFWEEK(attendances.date_time) = work_schedule_institution.day
                    AND TIME(attendances.date_time) <= (work_schedule.arrival_time + work_schedule_institution.entry_tolerance)
                    AND attendances.status = 1   THEN 'A'
                WHEN 
                      TIME(attendances.date_time) > (work_schedule.arrival_time + work_schedule_institution.entry_tolerance)
                    AND DATE(attendances.date_time) = DATE(justifications.date_justification) AND justifications.StatusJustificationIdStatusJustification=3 THEN 'TJ'
              WHEN attendances.punch = 0 
                    AND DAYOFWEEK(attendances.date_time) = work_schedule_institution.day
                    AND TIME(attendances.date_time) > (work_schedule.arrival_time + work_schedule_institution.entry_tolerance)
                    AND attendances.status = 1            
                    THEN 'T'
            END AS statusAttendance
        FROM 
            work_schedule_institution 
        JOIN 
            work_schedule ON work_schedule.id_work_schedule = work_schedule_institution.WorkScheduleIdWorkSchedule
        JOIN 
            institution_staff ON work_schedule_institution.InstitutionStaffIdInstitutionStaff = institution_staff.id_institution_staff
        JOIN 
            staffs ON staffs.id_card = institution_staff.StaffIdCard
        JOIN 
            attendances ON attendances.InstitutionStaffIdInstitutionStaff = institution_staff.id_institution_staff
        LEFT JOIN 
            justifications ON justifications.InstitutionStaffIdInstitutionStaff = institution_staff.id_institution_staff
        WHERE 
            institution_staff.id_institution_staff = :id_institution_staff AND 
            institution_staff.InstitutionShiftIdInstitutionShift = :id_institution_shift AND
            attendances.punch = 0 AND (DAYOFWEEK(attendances.date_time) = work_schedule_institution.day OR (DATE(attendances.date_time) = DATE(justifications.date_justification) AND justifications.StatusJustificationIdStatusJustification=3))  AND
            MONTH(attendances.date_time) = :month AND
            YEAR(attendances.date_time) = :year
        GROUP BY attendances.date_time;
      `, {
        replacements: {
          id_institution_staff,
          id_institution_shift,
          month,
          year
        },
        type: QueryTypes.SELECT, // Cambié a SELECT ya que es una consulta SELECT y no RAW
      });
  
      return resultado;
  
    } catch (e) {
      console.error(e);
      throw new Error(`Error al obtener asistencia detallada del institución personal ${id_institution_staff}`);
    }
};
export const queryInfoOneTypeJustification = async (
    year: number,
    id_type_justification: number 
  ) => {
    try {
      const resultado = await connectDB.query(`
      SELECT MONTH(createdAt) as month, COUNT(*) as counter FROM justifications
      WHERE justifications.status = 1 AND 
            YEAR(justifications.createdAt) = :year AND 
            justifications.TypeJustificationIdTypeJustification = :id_type_justification
      GROUP BY MONTH(createdAt);
      `, {
        replacements: {
          id_type_justification,
          year
        },
        type: QueryTypes.SELECT, // Cambié a SELECT ya que es una consulta SELECT y no RAW
      });
  
      return resultado;
  
    } catch (e) {
      console.error(e);
      throw new Error(`Error al obtener información de las justificaciones`);
    }
};
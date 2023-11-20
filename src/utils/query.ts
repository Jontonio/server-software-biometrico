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
        SELECT
          institution_staff.StaffIdCard AS id_card,
          attendances.date_time,
          DAY(attendances.date_time) AS day,
          CASE
            WHEN attendances.punch = 0 AND DAYOFWEEK(attendances.date_time) = work_schedule_institution.day
                AND TIME(attendances.date_time) <= (work_schedule.arrival_time + work_schedule_institution.entry_tolerance) THEN 'A'
            ELSE 'T'
          END AS statusAttendance
        FROM 
          work_schedule_institution 
        LEFT JOIN 
          work_schedule ON work_schedule.id_work_schedule = work_schedule_institution.WorkScheduleIdWorkSchedule
        LEFT JOIN 
          institution_staff ON work_schedule_institution.InstitutionStaffIdInstitutionStaff = institution_staff.id_institution_staff
        LEFT JOIN 
          staffs ON staffs.id_card = institution_staff.StaffIdCard
        LEFT JOIN 
          attendances ON attendances.InstitutionStaffIdInstitutionStaff = institution_staff.id_institution_staff
        WHERE 
          institution_staff.id_institution_staff = :id_institution_staff AND 
          institution_staff.InstitutionShiftIdInstitutionShift = :id_institution_shift AND
          attendances.punch = 0 AND DAYOFWEEK(attendances.date_time) = work_schedule_institution.day AND
          MONTH(attendances.date_time) = :month AND
          YEAR(attendances.date_time) = :year
        GROUP BY
          institution_staff.StaffIdCard,
          attendances.date_time,
          work_schedule_institution.day,
          statusAttendance;
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
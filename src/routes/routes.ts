
import { Router } from 'express';
import { 
    routerInstitution,
    routerUser,
    routerAuth,
    routerRoles,
    routerStaff,
    routerTypeStaff,
    routerAttendance,
    routerTypeAttendance,
    routerInstitutionStaff,
    routerWorkSchudule,
    routerWorkSchuduleIE,
    routerReport,
    routerFile,
    routerJustification,
    routerShift,
    routerSearch,
    routerEmail,
    routerBiometric } from '../routes';

const routes:Router[] = [
    routerInstitution,
    routerUser,
    routerAuth,
    routerRoles,
    routerStaff,
    routerTypeStaff,
    routerAttendance,
    routerTypeAttendance,
    routerInstitutionStaff,
    routerWorkSchudule,
    routerWorkSchuduleIE,
    routerBiometric,
    routerReport,
    routerFile,
    routerShift,
    routerSearch,
    routerEmail,
    routerJustification
] 

export default routes;
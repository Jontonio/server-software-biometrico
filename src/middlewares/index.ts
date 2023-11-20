export { validateJWT } from "./jwt.middleware";
export { haveRole, isAdminRole } from "./role.middleware";
import * as typeStaffMiddleware from './typeStaff.middleware'
import * as staffMiddleware from './staff.middleware'
import * as institutionStaffMiddleware from './institutionStaff.middleware'
import * as institucionMiddleware from './institution.middleware'

export {
    typeStaffMiddleware,
    staffMiddleware,
    institucionMiddleware,
    institutionStaffMiddleware
}
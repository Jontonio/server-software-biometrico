import { Role } from "../models/Rol";

export const existRole = async (id_role:number) => {
    // find one role by primary key
    const existRole = await Role.findByPk( id_role );
    // verify if exist role
    if( !existRole ){
        throw new Error(`Error al registrar rol del usuario (digíte un rol válido)`);
    }
    
}
import { Request, Response } from "express"
import { User, Role } from "../models"
import { ResponseServer } from "../class/Response";
import { hasPassword } from "../helpers";

export const getUsers = async (req:Request, res: Response)=> {
    try {
        //get all users 
        const users = await User.findAll({
            where:{ status: true },
            attributes:{ 
                exclude:['password'] 
            },
            include:Role
        });
        // return response message
        return res.status(200).json( new ResponseServer('Lista de usuarios', true, users, users.length ))

    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al obtener los usuarios', false, null))
    }
}

export const getOneUser = async (req:Request, res: Response)=> {
    try {
        // get id user from params
        const { id_user } = req.params; 
        // find one user 
        const user = await User.findByPk(id_user, { 
            attributes:{ 
                exclude:['password'] 
            }
        });
        // return response message
        return res.status(200).json( new ResponseServer(`Usuario con id ${id_user}`, true, user ))

    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error el usuario', false, null))
    }
}

export const updateUser = async (req:Request, res: Response) => {
    try {
        // get id user from params
        const { id_user } = req.params;
        const { body } = req;
        // get one user by primary key
        const user = await User.findByPk(id_user);
        // update user
        const resUpdateUser = await user!.set( body ).save();
        // delete password
        const userWithoutPassword = { ...resUpdateUser.toJSON() };
        delete userWithoutPassword.password;
        // return reponse message 
        return res.status(200).json( new ResponseServer('Usuario actualizado correctamente', true, userWithoutPassword));

    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer(`Ocurrio un error al actualizar usuario`, false, null));
    } 
}

export const registerUser = async (req:Request, res: Response)=> {
    try {
        // get data from body
        const { body } = req;
        const { id_card } =  body;
        // encrypt password
        body.password = hasPassword( id_card )
        // register user      
        const createdUser = await User.create(body);
        // delete password 
        const userWithoutPassword = { ...createdUser.toJSON() };
        delete userWithoutPassword.password;

        //return response message
        return res.status(201).json( new ResponseServer('Usuario registrado correctamente', true, userWithoutPassword));

    } catch (e) {
        console.log(e)
        return res.status(500).json( new ResponseServer(`Ocurrio un error al registrar nuevo usuario`, false, null));
    }
}

export const deleteUser = async (req:Request, res: Response)=> {
    try {
        // get id card from params
        const { id_user } = req.params;
        // find one user
        const user = await User.findByPk( id_user );
        // delete the same user
        const resUser = await user?.set({ satatus: false }).save();
        // return response message
        return res.status(200).json( new ResponseServer('Usuario eliminado correctamente', true, resUser));

    } catch (e) {
        console.log(e)
        return res.status(500).json( new ResponseServer(`Ocurrio un error al eliminar el usuario`, false, null));
    }
}

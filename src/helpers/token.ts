
import jwt from "jsonwebtoken";
import { globalConfig } from "../config/config";


export const generateToken = (payload: any ) => {
    return jwt.sign({ data: payload }, globalConfig.SECRET_KET_TOKEN, { expiresIn:'12h'} );
}

export const getPayloadToken = (token:string) => {
    return jwt.verify(token as string, globalConfig.SECRET_KET_TOKEN );
}
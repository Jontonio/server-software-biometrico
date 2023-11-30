
import jwt from "jsonwebtoken";


export const generateToken = (payload: any, secretKeyToken:string, expiresIn:string | number) => {
    return jwt.sign({ data: payload }, secretKeyToken, { expiresIn:expiresIn } );
}

export const getPayloadToken = (token:string, secretKeyToken:string) => {
    return jwt.verify(token as string, secretKeyToken );
}
import bcrypt from "bcrypt";


export const hasPassword = ( text: string ) => {
    const salt = bcrypt.genSaltSync(15);
    return bcrypt.hashSync(text, salt);
}

export const comparePassword = async ( text: string, hashText:string ) => {
    return await bcrypt.compare( text, hashText)
}
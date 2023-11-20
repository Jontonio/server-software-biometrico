
export class Payload {

    data: Data;
    iat: number; 
    exp: number;

    constructor(data:Data, iat: number, exp: number){
        this.data = data;
        this.iat = iat; 
        this.exp = exp;
    }
}

export class Data {

    id_user: number;
    names: string;
    email: string; 

    constructor(id_user: number, names: string, email: string){
        this.id_user = id_user;
        this.names = names;
        this.email = email; 
    }
}

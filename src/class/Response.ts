
export class ResponseServer{
    
    msg:string;
    status:boolean;
    data: any;
    count!: number | undefined;
    
    constructor(msg:string, status:boolean, data?:any, count?:number){
        this.msg = msg;
        this.status = status;
        this.data = data;
        this.count = count;
    }
}

export class ResponseSUNAT{
    constructor(public nombres: string, public apellidoPaterno: string, public apellidoMaterno: string){}
}
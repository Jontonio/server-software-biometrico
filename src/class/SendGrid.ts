
class BodySendGrid {
    
    to:string;
    from:string;
    subject:string;
    templateId:string;
    dynamicTemplateData: any;

    constructor(to:string, from:string, subject:string, templateId:string, dynamicTemplateData:any){
        this.to = to;
        this.from = from;
        this.subject = subject;
        this.templateId = templateId;
        this.dynamicTemplateData = dynamicTemplateData;
    }
}

export {
    BodySendGrid
}
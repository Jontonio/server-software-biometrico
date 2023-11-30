import { sendEmailWithTemplate } from "./sendGrid"

export const switchStatusJustificationEmail = async (status_justification:string, data:any) => {
    const { InstitutionStaff, TypeJustification, date_justification, createdAt } = data;
    const dataEmail = { 
        name: InstitutionStaff.Staff.names,
        justifyType:TypeJustification.type_justification,
        justifyDate:date_justification,
        justifyCreated:createdAt
    };
    const template = switchTemplate(status_justification);
    await sendEmailWithTemplate(InstitutionStaff.Staff.email, 'prueba', template, dataEmail)
}

const switchTemplate = (status_justification:string) => {
    let id_template = '';
    switch (status_justification) {
        case 'ENVIADO':
            id_template = 'd-6ad08d0631d148c1a69163a42062a8e4'; 
            break;
        case 'EN PROGRESO':
            id_template = 'd-15b06fc6f86a43f5aa3d383630170937'; 
            break;
        case 'ACEPTADO':
            id_template = 'd-aeefb25774e34bfeb81e014059d4ab2d'; 
            break;
        case 'RECHAZADO':
            id_template = 'd-3952f78a8d6842d3a3d576563745d07c'; 
            break;
        default:
            break;
    }
    return id_template;
}
import sgMail  from '@sendgrid/mail'
import { globalConfig } from '../config/config';

sgMail.setApiKey(globalConfig.SEND_GRID_API_KEY);

export const sendEmailWithTemplate = async (to:string, subject:string, templateId:string, data:any) => {

  const from = globalConfig.EMAIL_SEND_GRID;
  
  return sgMail.send({
    to,
    from,
    subject,
    templateId,
    dynamicTemplateData: data,
  });

}

export const sendEmailBasic = async (to:string, subject:string, html:any) => {

  const from = globalConfig.EMAIL_SEND_GRID;
  
  return sgMail.send({
    to,
    from,
    subject,
    html
  });

}

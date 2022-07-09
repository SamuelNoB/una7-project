import nodemailer from 'nodemailer';

type emailData = {
  from : string,
  to: string,
  subject: string
  text: string,
}
export function sendEmail(params:emailData) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.titan.email',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_EMAIL_PASS
    }
  });
  transporter.sendMail(params, (error, info) => {
    if (error) {
      console.log(error);
      return
    }
    console.log("Email Enviado: " + info.response);
  })
}
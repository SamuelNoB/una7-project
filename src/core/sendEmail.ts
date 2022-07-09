import nodemailer from 'nodemailer';

type emailData = {
  from : string,
  to: string,
  subject: string
  text: string,
}
export function sendEmail(params:emailData) {
  let transporter = nodemailer.createTransport({
    host: 'br1024.hostgator.com.br',
    port: 2096,
    secure: true,
    service: "br1024.hostgator.com.br",
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
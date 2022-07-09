// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Contact} from '@prisma/client'
import Error from 'next/error'
import prisma from '@core/db'
import { sendEmail } from '@core/sendEmail'


type responseData = {
  message: string
  contactData?: Contact
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseData | Error>
) {
  if (req.method === "POST") {
    const data: ContactInput = req.body;
    
    checkInput(data);
    
    const result = await prisma.contact.create({
      data: {
        content: data.message,
        email: data.email,
        senderName: data.fullName,
        subject: data.subject
      }
    });
    sendEmail({
      from: process.env.SENDER_EMAIL as string,
      to: process.env.RECIEVER_EMAIL as string,
      subject: data.subject,
      text: `Informações do cliente\nNome: ${data.fullName}\nEmail: ${data.email}\n\n` + `Mensagem\n`+ data.message
    })
    return res.status(200).json({
      message: 'Mensagem enviada com sucesso',
      contactData: result
    });
  }
  return res.status(400).json({
    message: 'Ocorreu um erro ao processar a solicitação.'
  })
}

function checkInput(contactInput:ContactInput) {
  let result = {isValid: true, error: ''}
  const errorMessage = {
    fullName: 'Mensagem deve possuir nome do remetente.',
    email: 'Mensagem deve possuir email para contato',
    subject: 'Mensagem deve possuir assunto.',
    message: 'Mensagem deve possuir conteúdo.'
  }
  type ObjectKey = keyof typeof contactInput;

  const fields = Object.keys(contactInput) as ObjectKey[];
  
  fields.forEach(field => {
    if (contactInput[field] === '') {
      result.error = errorMessage[field]
      result.isValid = false;
      throw new Error({statusCode: 402, title: result.error})
    }
  })
  return result;
}
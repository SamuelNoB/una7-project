// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Contact, PrismaClient} from '@prisma/client'



type responseData = {
  message: string
  contactData?: Contact
}
type Error = {
  error: string
}
const prisma = new PrismaClient()
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseData | Error>
) {
  if (req.method === "POST") {
    const data: ContactInput = req.body;
    const {isValid, error} = checkInput(data);

    if (!isValid) {
        return res.status(401).json({
          error
        });
    }
    const result = await prisma.contact.create({
      data: {
        content: data.message,
        email: data.email,
        senderName: data.fullName,
        subject: data.subject
      }
    });
    return res.status(200).json({
      message: 'Mensagem enviada com sucesso',
      contactData: result
    });
  }
  return res.status(400).json({
    error: 'Ocorreu um erro ao processar a solicitação.'
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
      return result;
    }
  })
  return result;
}
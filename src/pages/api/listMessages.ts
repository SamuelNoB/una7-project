import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@core/db";
import { getSession } from "next-auth/react";



export default async function handler(req:NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const session = await getSession({ req })

    if( !session) {
      return res.status(401).json({
        error: 'Você não pode acessar essa rota'
      })
    }

    const contactData = await prisma.contact.findMany({
      distinct: ['email'],
      orderBy: {
        senderName: 'asc'
      }
    });
    const data = contactData.map((aContact, index) => {
      return {
        numero: index,
        name: aContact.senderName,
        email: aContact.email
      }
    })
    return res.status(200).json({data})
  }
}
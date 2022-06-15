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
      orderBy: {
        senderName: 'asc'
      }
    });

    return res.status(200).json({data: contactData})
  }
}
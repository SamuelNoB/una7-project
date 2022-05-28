import { PrismaClient,Publication } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'

type Data = {
  posts: Partial<Publication>[]
}
type Error = {
  error: string
}

const apiRoute = nextConnect({
  onNoMatch(req: NextApiRequest,
    res: NextApiResponse<Data | Error>
  ) {  return res.status(400).json({
    error: 'Ocorreu um erro ao processar a solicitação.'
  })}
})

const prisma = new PrismaClient()

async function getAllPosts(req: NextApiRequest, res: NextApiResponse<Data>) {
  const allPosts = await prisma.publication.findMany({
    where: {
      active: true
    },
    select: {
      title: true,
      subTitle: true,
      coverImage: true,
      id: true,
      createdAt: true
    },
    orderBy: {
      createdAt: 'asc'
    }
  });
  return res.status(200).json({posts: allPosts})
}

apiRoute.get(getAllPosts)
export default apiRoute;
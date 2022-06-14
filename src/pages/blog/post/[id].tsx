import { useQuery } from "react-query"
import { useRouter } from 'next/router'
import DefaultLayout from "../../../layouts/DefaultLayout"
import { useEffect, useState } from "react"
import { Publication } from ".prisma/client"
import PostService from "../../../services/PostService";
import { Col, Row } from "reactstrap"
import parse from 'html-react-parser';
import Image from "next/image"
import dayjs from "dayjs"
import {AiOutlineLink} from "react-icons/ai"

function BlogIndex(props: any) {
  const [blogContent, setBlogContent] = useState<Publication>({
    active: true,
    authorId: 0,
    content: '',
    coverImage: '',
    createdAt: new Date(),
    id: 0,
    imageType: '',
    subTitle: '',
    title: '',
    updatedAt: new Date()
  });
  const router = useRouter()
  const { id } = router.query
  const {data, error} = useQuery(['getOnePost', { id }], PostService.getOnePost)
  const displayDate = dayjs(blogContent.createdAt).format('DD/MM/YYYY');

  useEffect(()=> {
    if (data) {
      setBlogContent(data)
    }
  }, [data])

  function sharePost() {
    navigator.share({
      text: blogContent?.subTitle,
      title: blogContent.title,
      url: router.asPath
    })
  }

  return (
    <div className="post-container">
      <div className="post-container__content">
        <Row className="justify-content-between">
          <Col xs='auto' className="text-muted">Criado em: {displayDate}</Col>
          <Col xs='auto'>
          <Row className="d-flex text-muted">
            <Col xs='auto' style={{paddingRight: 0}}>Compartilhar:</Col>
            <Col xs='auto' className="hoverClassForButtons text-muted"  href="https://www.facebook.com/agenciauna7" target="_blank">
              <AiOutlineLink size={25} onClick={ ()=> sharePost()}/>
            </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <h1>{blogContent?.title}</h1>
          </Col>
          <Col lg={12}>
            <h3 className="text-muted">{blogContent.subTitle}</h3>
          </Col>
          <Col>
          <Image src={`data:${blogContent.imageType};base64, ${blogContent.coverImage}`} alt="client" width={'100%'} height={'100%'} layout='responsive' />
          </Col>
        </Row>
      </div>
      {
        blogContent?.content ? parse(blogContent?.content as string) : (<></>)
      }
    </div>
  )
}

BlogIndex.getLayout = (page: any) => {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export default BlogIndex
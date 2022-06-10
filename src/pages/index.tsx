import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from 'next/image';
import { ElfsightWidget } from 'react-elfsight-widget';
import { Container, Row, Col} from "reactstrap";

import DefaultLayout from '../layouts/DefaultLayout'
import ClientCard from "../components/home/ClientCard";
import BlogCard from "../components/BlogCard";
import PartnerCard from "../components/home/PartnerCard";
import WhatsappItem from "../components/home/Whatsapp";

import PostService from "../services/PostService";
import dayjs from "dayjs";
import ClientService from "../services/ClientService";
import { Client } from "@prisma/client";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};


const Home = () => {

  const {data, error, isLoading} = useQuery('getLastPosts', PostService.getAllPost)
  const {data: serverClients} = useQuery('getClients', ClientService.getAllClients);
  const [publications, setPublications] = useState<SmallPublication[]>([]);
  const [clients, setClients] = useState<Client[]>([])
  useEffect(() => {
    if (data) {
      setPublications(data)
    }
    if (serverClients) {
      setClients(serverClients);
    }
  }, [data, serverClients])


  return (
    <>
      <div style={{height: '100vh', backgroundImage:`url(/images/camp.jpeg)`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
          <Row className="h-100 w-100 justify-content-center align-items-center" style={{backgroundColor: '#FFF3', margin: 0}}>
            <Row className='justify-content-center w-100' >
              <Col lg={3} style={{textAlign: 'center'}} className='fs-2 fw-bold'>Bem vindo a agência Una7</Col>
              <Col lg={6} className='fs-5 ' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, iure optio? Minus praesentium modi nihil doloremque tempora illo asperiores qui quas, eligendi rerum aspernatur provident iste magni ea repellendus odio. </Col>
            </Row>
          </Row>
      </div>
      <Container style={{marginTop: '6em'}}>
            <Row className="justify-content-center" style={{marginBottom: '2em'}}>
              <Col lg={4} className="fs-2 fw-bold" style={{textAlign: 'center'}}>Título de um tópico</Col>
            </Row>
            <Row className="justify-content-center">
              <Col lg={6}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam temporibus beatae sed ipsum nostrum molestias, consequuntur culpa ut dolor inventore numquam cupiditate ratione obcaecati mollitia exercitationem quibusdam nesciunt sit dignissimos.</Col>
              <Col lg={3}><Image src={'/images/rocket.jpg'} width={380} height={420} layout='responsive' alt="topic image"/></Col>
            </Row>
      </Container>
      <Container style={{marginTop: '6em'}}>
      <Row className="justify-content-center" style={{marginBottom: '2em'}}>
          <Col lg={4} className="fs-2 fw-bold" style={{textAlign: 'center'}}>Clientes</Col>
      </Row>
      <Row className="justify-content-center">
        <Col lg={9}>
          <div className="clients-grid">
            {
              clients.map(client => {
                return (
                  <div key={client.id} className="clients-grid__item">
                    <ClientCard key={client.id} imageLink={'/uploads/'+client.clientPhoto} externalLink={client.link as string} />
                  </div>
                )
              })
            }
          </div>
        </Col>
      </Row>
      </Container >

      <Container style={{marginTop: '6em'}}>
        <Row className="justify-content-center" style={{marginBottom: '2em'}}>
            <Col lg={9} className="fs-2 fw-bold" style={{textAlign: 'center'}}>Últimas publicações</Col>
        </Row>
        
          <Row className="justify-content-center" style={{marginBottom: '2em'}}>
              <Col lg={9} className="fs-4 fw-bold" >Instragram</Col>
              <ElfsightWidget widgetID="92ad1ffe-4ccf-4a03-b540-45a1ed524bf8" />
          </Row>
          
          <Row className="justify-content-center">
            <Col lg={9} className="fs-4 fw-bold" style={{marginBottom: '0.5em'}}>Blog</Col>

            <Col lg={9}>
              <Carousel responsive={responsive}>
                {publications.map(publication => {
                  return (
                    <div key={publication.id} style={{margin: '0 0.2em'}}>
                    <BlogCard key={publication.id} {...publication} />
                    </div>
                  )
                })}
              </Carousel>
            </Col>
          </Row>
      </Container>

      <Container style={{marginTop: '6em', marginBottom: '8em'}}>
        <Row className="justify-content-center" style={{marginBottom: '2em'}}>
            <Col lg={4} className="fs-2 fw-bold" style={{textAlign: 'center'}}>Parceiros</Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={9}>
            <Carousel responsive={responsive}  >
              <div style={{margin: '0 0.2em'}}>
                <PartnerCard />
              </div>
              <div style={{margin: '0 0.2em'}}>
                <PartnerCard />
              </div>
              <div style={{margin: '0 0.2em'}}>
                <PartnerCard />
              </div>
            </Carousel>
          </Col>
        </Row>
      </Container>
      <WhatsappItem to={"https://wa.me/556181577003"}/>
    </>
    
  )
}

Home.getLayout = function getLayout(page: any) {
  return (
    <DefaultLayout fixed={"top"}>
      {page}
    </DefaultLayout>
  )
}

export default Home

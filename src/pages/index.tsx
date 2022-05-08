import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import type { NextPage } from 'next'
import Image from 'next/image';

import { Container, Row, Col} from "reactstrap";

import DefaultLayout from '../layouts/DefaultLayout'
import ClientCard from "../components/home/ClientCard";

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

  return (
    <>
      <div style={{height: '100vh', backgroundImage:`url(/images/camp.jpeg)`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
          
          <Row className="h-100 w-100 justify-content-center align-items-center">
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
      <div>
        <Row className="justify-content-center" style={{margin: '6px 0'}}>
          <Col lg={3} style={{padding: '0 3px'}}>
            <ClientCard imageLink="/images/balloon.jpeg" externalLink="https://www.facebook.com/" ></ClientCard>
          </Col>
          <Col lg={3} style={{padding: '0 3px'}}>
            <ClientCard imageLink="/images/balloon.jpeg" externalLink="https://www.facebook.com/" ></ClientCard>
          </Col>
          <Col lg={3} style={{padding: '0 3px'}}>
            <ClientCard imageLink="/images/balloon.jpeg" externalLink="https://www.facebook.com/" ></ClientCard>
          </Col>
        </Row>
        <Row className="justify-content-center" style={{margin: '6px 0'}}>
          <Col lg={3} style={{padding: '0 3px'}}>
            <ClientCard imageLink="/images/balloon.jpeg" externalLink="https://www.facebook.com/" ></ClientCard>
          </Col>
          <Col lg={3} style={{padding: '0 3px'}}>
            <ClientCard imageLink="/images/balloon.jpeg" externalLink="https://www.facebook.com/" ></ClientCard>
          </Col>
          <Col lg={3} style={{padding: '0 3px'}}>
            <ClientCard imageLink="/images/balloon.jpeg" externalLink="https://www.facebook.com/" ></ClientCard>
          </Col>
        </Row>
      </div>
      </Container >
      <Container style={{marginTop: '6em'}}>
        <Row className="justify-content-center" style={{marginBottom: '2em'}}>
            <Col lg={4} className="fs-2 fw-bold" style={{textAlign: 'center'}}>Ultimas publicações</Col>
        </Row>

        <div>
          <Row style={{marginBottom: '2em'}}>
              <Col lg={4} className="fs-4 fw-bold" >Instragram</Col>
          </Row>
          <Row style={{marginBottom: '2em'}}>
              <Col lg={4} className="fs-4 fw-bold" >Blog</Col>
          </Row>
          <Carousel responsive={responsive}>
            <ClientCard imageLink="/images/balloon.jpeg" externalLink="https://www.facebook.com/" ></ClientCard>
            <ClientCard imageLink="/images/balloon.jpeg" externalLink="https://www.facebook.com/" ></ClientCard>
            <ClientCard imageLink="/images/balloon.jpeg" externalLink="https://www.facebook.com/" ></ClientCard>
            <ClientCard imageLink="/images/balloon.jpeg" externalLink="https://www.facebook.com/" ></ClientCard>
            <ClientCard imageLink="/images/balloon.jpeg" externalLink="https://www.facebook.com/" ></ClientCard>
          </Carousel>
        </div>
      </Container>
    </>
    
  )
}

Home.getLayout = function getLayout(page: any) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export default Home

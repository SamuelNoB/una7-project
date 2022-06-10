import { useSession, signIn } from "next-auth/react"
import { useState, useEffect } from "react";
import Image from 'next/image'
import { BsFacebook, BsLinkedin, BsInstagram, BsTwitter } from "react-icons/bs";
import logo from '../static/images/LogoUna7.jpg'
import {
  Row,
  Col,
  Navbar, 
  NavItem, 
  NavLink, 
  Nav, 
  NavbarBrand, 
  NavbarToggler,
  Collapse
} from "reactstrap";
import { useRouter } from "next/router";

const linkStyle = {color: 'rgba(0,0,0,1) !important'}
let style = {};
export default function DefaultLayout({children, fixed}: any) {
  const { data: session, status } = useSession()
  const router = useRouter();
  useEffect(() => {
    style = {margin: '0 0'}
    if (window.innerWidth < 768) {
      style = {margin: '0 5px'}
    }
  })
  const [isOpen, setIsOpen] = useState(false);
  
  function toggle () {
    setIsOpen(!isOpen)
  }
  function sendToAdmin() {
    if (status === 'authenticated') {
      router.push('/admin')
      return
    }
    signIn('google', {
      callbackUrl: '/admin'
    })
  }



  return (
    <>
    <Navbar
      expand="lg"
      light
      fixed={fixed}
      style={{backgroundColor: '#d8d8d880'}}

    >
      <NavbarBrand href="/">
        <Image src={logo} width={55} height={55} alt="logo"/>
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse navbar 
        isOpen={isOpen}>
        <Nav
          className="ms-auto fw-bold fs-5"
          navbar
        >
          <NavItem>
            <NavLink className="hoverClassForButtons" href="/" style={linkStyle}>
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="hoverClassForButtons" href="/blog" style={linkStyle}>
              Blog
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="hoverClassForButtons" href="/contact" style={linkStyle}>
              Contato
            </NavLink>
          </NavItem>
          <NavItem className="d-flex">
                  <NavLink className="hoverClassForButtons" style={ {...style, ...linkStyle} } href="https://www.facebook.com/agenciauna7" target="_blank">
                    <BsFacebook size={20}/>
                  </NavLink>
                  <NavLink className="hoverClassForButtons" style={ {...style, ...linkStyle} } href="https://www.linkedin.com/in/agenciauna7/" target="_blank">
                    <BsLinkedin size={20} />
                  </NavLink>
                  <NavLink className="hoverClassForButtons" style={ {...style, ...linkStyle} } href="https://www.instagram.com/agenciauna7/" target="_blank">
                    <BsInstagram size={20} />
                  </NavLink>
                  <NavLink className="hoverClassForButtons" style={ {...style, ...linkStyle} } href="https://www.instagram.com/agenciauna7/" target="_blank">
                    <BsTwitter size={20} />
                  </NavLink>
          </NavItem>
          
        </Nav>
    </Collapse>
    </Navbar>
      <main>{children}</main>
    <div className="w-100">
        <Row className="w-100 align-items-end" style={{backgroundColor: '#E3E3E3', margin: '0'}}>
          <Col className="d-flex " style={{height: '4em'}}>
            <p onClick={sendToAdmin} style={{cursor: 'pointer'}}>
              Administrador
              </p>
          </Col>
        </Row>
        <Row className="w-100 justify-content-between" style={{backgroundColor: '#C9C9C9', margin: '0'}}>
          <Col lg={3}>Desenvolvido por Samuel Nogueira</Col>
          <Col lg={4} style={{textAlign: 'center'}}>Agência Una7 © 2022. Todos os direitos Reservados</Col>
          <Col lg={2}></Col>
        </Row>
    </div>
    </>
  )
}

import { useState, useEffect } from "react";
import Image from 'next/image'
import Link from "next/link";
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


let style = {};
export default function DefaultLayout({children}: any) {
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
  



  return (
    <>
    <Navbar
      expand="lg"
      light
      fixed="top"
      style={{backgroundColor: 'transparent'}}

    >
      <NavbarBrand href="/">
        <Image src={logo} width={55} height={55} alt="logo"/>
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse navbar 
        isOpen={isOpen}>
        <Nav
          className="ms-auto"
          navbar
        >
          <NavItem>
            <NavLink href="/">
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/blog">
              Blog
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/contact">
              Contato
            </NavLink>
          </NavItem>
          <NavItem className="d-flex">
                  <NavLink style={ style } href="https://www.facebook.com/agenciauna7" target="_blank">
                    <BsFacebook size={20}/>
                  </NavLink>
                  <NavLink style={ style } href="https://www.linkedin.com/in/agenciauna7/" target="_blank">
                    <BsLinkedin size={20} />
                  </NavLink>
                  <NavLink style={ style } href="https://www.instagram.com/agenciauna7/" target="_blank">
                    <BsInstagram size={20} />
                  </NavLink>
                  <NavLink style={ style } href="https://www.instagram.com/agenciauna7/" target="_blank">
                    <BsTwitter size={20} />
                  </NavLink>
          </NavItem>
          
        </Nav>
    </Collapse>
    </Navbar>
      <main>{children}</main>
    <div className="fixed-bottom">
        <Row style={{backgroundColor: '#E3E3E3'}}>
          <Col className="d-flex align-items-start" style={{height: '4em'}}>
            <Link href="/admin" >
              Administrador
              </Link>
          </Col>
        </Row>
        <Row className="justify-content-between" style={{backgroundColor: '#C9C9C9'}}>
          <Col lg={3}>Desenvolvido por Samuel Nogueira</Col>
          <Col lg={4}>Agência Una7 © 2022. Todos os direitos Reservados</Col>
          <Col lg={2}></Col>
        </Row>
    </div>
    </>
  )
}
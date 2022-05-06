
import { useState, useEffect } from "react";
import { BsFacebook, BsLinkedin, BsInstagram, BsTwitter } from "react-icons/bs";
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
      color="light"
      expand="md"
      light
    >
      <NavbarBrand href="/">
        Una7
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
    <footer>
    </footer>
    </>
  )
}
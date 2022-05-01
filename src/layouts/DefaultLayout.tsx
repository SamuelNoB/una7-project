
import { BsFacebook, BsLinkedin, BsTwitter } from "react-icons/bs";
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

export default function DefaultLayout({children}: any) {
  return (
    <>
    <Navbar
      color="light"
      expand="md"
      
    >
      <NavbarBrand href="/">
        Una7
      </NavbarBrand>
      <NavbarToggler onClick={function noRefCheck(){}} />
      <Collapse navbar >
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
                  <NavLink>
                    <BsFacebook/>
                  </NavLink>
                  <NavLink>
                    <BsLinkedin />
                  </NavLink>
                  <NavLink>
                    <BsTwitter />
                  </NavLink>
          </NavItem>
          
        </Nav>
    </Collapse>
    </Navbar>
      <main>{children}</main>
    <footer>
      foo bar
    </footer>
    </>
  )
}
import { BsTelephone } from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdAlternateEmail, MdEmail, MdForwardToInbox, MdLocationOn } from "react-icons/md";


import DefaultLayout from "../layouts/DefaultLayout"
import { Container, Row, Col, Form, FormGroup, Input,Label, Button, Card, CardBody, CardTitle } from "reactstrap";
import { useState } from "react";

const alignText = {
  textAlign: 'center'
}

interface ContactInput {
  fullName: string,
  email: string,
  subject: string,
  message: string,
}
function ContactPage(props: any) {
  const [contactInput, setContatInput] = useState<ContactInput>({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  })


  const submitForm = async (e: Event) => {
    e.preventDefault()
    const response = await fetch('api/sendMessage', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(contactInput),
    });
    
    const data = await response.json();
    if (data?.error) {
      toast.error(data.error, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        });
      return ;
    }

    toast.success(data.message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      });
  }

  return (
  <>
    <Container style={{marginBottom: '3em'}}>
      <Row style={{margin: '2em 0 4em 0'}} className="justify-content-center">
        <Col lg={2}>
          <h2 style={{textAlign: 'center'}}>Contatos</h2>
        </Col>
      </Row>
      <Row>
        <Col style={{margin: 'auto 0'}} >
          <Row className="justify-content-center">
            <Col lg={4}>
              <div style={{margin: '0 auto', width: 'fit-content'}}>
                <BsTelephone  size={50} />
              </div>
              <p className="fw-bold" style={{textAlign: 'center'}}>Telefone</p>
              <p style={{textAlign: 'center'}}>(61) 9 9996-4690</p>
            </Col>
            <Col lg={4}>
              <div style={{margin: '0 auto', width: 'fit-content'}}>
                <MdAlternateEmail  size={50} />
              </div>
              <p className="fw-bold" style={{textAlign: 'center'}}>E-mail</p>
              <p style={{textAlign: 'center'}}>Email@email.com.br</p>
            </Col>
            </Row>
            <Row className="justify-content-center">
              <Col lg={4}>
                <div style={{margin: '0 auto', width: 'fit-content'}}>
                  <MdLocationOn  size={50} />
                </div>
                <p className="fw-bold" style={{textAlign: 'center'}}>Endereço</p>
                <p style={{textAlign: 'center'}}>Endereço de exemplo</p>
              </Col>
              <Col lg={4}>
                <div style={{margin: '0 auto', width: 'fit-content'}}>
                  <MdEmail  size={50} />
                </div>
                <p className="fw-bold" style={{textAlign: 'center'}}>E-mail</p>
                <p style={{textAlign: 'center'}}>Email@email.com.br</p>
              </Col>
            </Row>
          
        </Col>
        <Col lg={5}>
          <Card>
            <CardBody>
              <CardTitle tag={'h3'} >
                Envie-nos uma mensagem
              </CardTitle>
              <Form onSubmit={submitForm}>
                <FormGroup>
                  <Label for='fullName'>
                    Nome completo
                  </Label>
                  <Input
                  type="text"
                  id='fullName'
                  placeholder="Digite seu nome completo"
                  onChange={e => setContatInput({...contactInput, fullName: e.target.value})}></Input>
                </FormGroup>
                <FormGroup>
                  <Label for='email'>
                    E-mail
                  </Label>
                  <Input
                  type="email"
                  id='email'
                  placeholder="Digite seu email para contato"
                  onChange={e => setContatInput({...contactInput, email: e.target.value})}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for='subject'>
                    Assunto
                  </Label>
                  <Input type="text"
                  id='subject'
                  placeholder="Coloque aqui o assunto da mensagem"
                  onChange={e => setContatInput({...contactInput, subject: e.target.value})}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for='message'>
                    Mensagem
                  </Label>
                  <Input type="textarea"
                  id='message'
                  placeholder="Digite a mensagem que gostaria de enviar"
                  onChange={e => setContatInput({...contactInput, message: e.target.value})}
                  />
                </FormGroup>
                <Row>
                  <Col lg={3}>
                    <Button style={{backgroundColor: 'rgba(169, 81, 139, 1)'}}>
                      Enviar <MdForwardToInbox />
                    </Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  </>
  )
}

ContactPage.getLayout = (page: any) => {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export default ContactPage
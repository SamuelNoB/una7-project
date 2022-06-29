import { BsTelephone } from "react-icons/bs";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdAlternateEmail, MdEmail, MdForwardToInbox, MdLocationOn } from "react-icons/md";

import { Container, Row, Col, Form, FormGroup, Input,Label, Button, Card, CardBody, CardTitle } from "reactstrap";

import { useState } from "react";
import { useMutation } from "react-query";


import DefaultLayout from "../layouts/DefaultLayout"
import ContactService from "../services/ContactService";

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
  const contactCreation = useMutation((newContact: ContactInput) => {return ContactService.sendMessage(newContact)})
  const [contactInput, setContatInput] = useState<ContactInput>({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  })


  const submitForm = (e: any) => {
    e.preventDefault()
    contactCreation.mutate(contactInput, {
      onSuccess(data, variables, context) {
        toast.success(data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          });
      },
      onError(error, variables, context) {
        console.log(error);
        
        toast.error(error as string, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          });
      },
    })
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
              <div  style={{margin: '0 auto', width: 'fit-content'}}>
                <BsTelephone  size={50} />
              </div>
              <p className="fw-bold" style={{textAlign: 'center'}}>Telefone</p>
              <p style={{textAlign: 'center'}}>(61) 9 8157-7003</p>
            </Col>
            <Col lg={4}>
                <div style={{margin: '0 auto', width: 'fit-content'}}>
                  <MdLocationOn  size={50} />
                </div>
                <p className="fw-bold" style={{textAlign: 'center'}}>Endereço</p>
                
                <p style={{textAlign: 'center'}}>Águas Claras - Brasília DF</p>
              </Col>
            
            </Row>
            <Row className="justify-content-center">
            <Col lg={6}>
              <div style={{margin: '0 auto', width: 'fit-content'}}>
                <MdAlternateEmail  size={50} />
              </div>
              <p className="fw-bold" style={{textAlign: 'center'}}>E-mail</p>
              <p style={{textAlign: 'center'}}>una7marketingdigital@gmail.com</p>
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
                  required
                  onChange={e => setContatInput({...contactInput, fullName: e.target.value})}></Input>
                </FormGroup>
                <FormGroup>
                  <Label for='email'>
                    E-mail
                  </Label>
                  <Input
                  type="email"
                  id='email'
                  required
                  placeholder="Digite seu email para contato"
                  onChange={e => setContatInput({...contactInput, email: e.target.value})}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for='subject'>
                    Assunto
                  </Label>
                  <Input type="text"
                  required
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
                  required
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
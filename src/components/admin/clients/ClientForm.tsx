import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import { Button, Col, Container, Form, Row, Input, FormGroup, Label } from "reactstrap"
import AdminHeader from "../Header"
import { useMutation } from "react-query";
import ClientService from "../../../services/ClientService";
import { toast } from "react-toastify";
import { Client } from "@prisma/client";

type props = {
  Client?: Client
}
function ClientForm({Client}: props ) {
  const router = useRouter()
  const [clientData, setClientData] = useState<createClientInput | any>({
    Image: '',
    link: '',
    name: '',
    visible: true
  });
  useEffect(() => {
    setClientData({
      link: Client?.link,
      name: Client?.name,
      visible: Client?.visible
    })
  }, [Client])

  const createClient = useMutation((newClient: createClientInput) =>  {return ClientService.createClient(newClient)})
  const updateClient = useMutation((newClient: createClientInput) =>  {return ClientService.updateClient(newClient)})

  function onSubmit(e: any) {
    e.preventDefault()
    if (Client) return onUpdate();
    onCreate()
  }
  function onCreate() {
    createClient.mutate(clientData, {
      onSuccess: () => {
        const message ='Cliente criado com sucesso!';
        toast.success(message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          });
        router.push('/admin/clients/')
      }
    })
  }

  function onUpdate() {
    updateClient.mutate(clientData, {
      onSuccess: () => {
        const message = 'Cliente atualizado com sucesso!'
        toast.success(message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          });
        router.push('/admin/clients/')
      }
    })
  }


  return (
    <>
      <Container>
        <AdminHeader title={'Adicionar cliente'} />
        <Form onSubmit={onSubmit}>
          <Row className="d-flex justify-content-center">
            <Col lg={6}>
              <FormGroup>
                <Label>
                  Nome do cliente
                </Label>
                < Input
                  type="text" 
                  placeholder="Companhia de roupas"
                  required
                  value={clientData.name} 
                  onChange={(e) => setClientData({...clientData, name: e.target.value})} />
              </FormGroup>
            </Col>
            <Col lg={2}>
              <FormGroup check >
                <Input type="checkbox" checked={clientData.visible as boolean} onChange={e => setClientData({...clientData, visible: !clientData.visible})} />
                {' '}
                <Label check>
                Cliente visível
                </Label>
              </FormGroup>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            <Col lg={8}>
              <FormGroup>
                <Label>
                  Pagina do cliente
                </Label>
                <Input 
                type="url"
                value={clientData.link}
                placeholder="https://exemplo.com"
                required
                onChange={(e) => setClientData({...clientData, link: e.target.value})}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            <Col lg={8}>
            <FormGroup>
              <Label>Imagem do cliente</Label>
              <UploaderComponent id='fileUpload' type='file' name='mainImage'selected={value => setClientData({...clientData, Image: value.filesData[0]})} autoUpload={false} />
            </FormGroup>
            </Col>
          </Row>
          <Row className="justify-content-end" style={{margin: '1.5em 0'}}>
            <Col xs="auto">
              <Button outline color='secondary' onClick={() => router.back()}>
                Voltar
              </Button>
            </Col>
            <Col xs="auto"><Button submit color='success' >Criar</Button></Col>
          </Row>
        </Form>
      </Container>
    </>
  )
}

export default ClientForm

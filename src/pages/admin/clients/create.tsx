import { NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import { Button, Col, Container, Form, Row, Input, FormGroup, Label } from "reactstrap"
import AdminHeader from "../../../components/admin/Header"
import AdminLayout from "../../../layouts/AdminLayout"
import { useMutation } from "react-query";
import ClientService from "../../../services/ClientService";


function CreateClient(params: any ) {
  const router = useRouter()
  const [createClientData, setCreateClientData] = useState<createClientInput>({
    Image: '',
    link: '',
    name: '',
    visible: true
  });

  const createClient = useMutation((newClient: createClientInput) =>  {return ClientService.createClient(newClient)})

  function onSubmit(e: any) {
    e.preventDefault()
    createClient.mutate(createClientData, {
      onSuccess: () => {
        router.push('/admin/clients/')
      }
    })

  }

  return (
    <>
      <Container>
        <AdminHeader title={'Adicionar cliente'} />
        <Row style={{marginBottom: '1em'}}>
          <Col>
          <Button outline size='sm' color='secondary' onClick={() => router.back()}>
            Voltar
          </Button>
          </Col>
        </Row>
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
                  value={createClientData.name} 
                  onChange={(e) => setCreateClientData({...createClientData, name: e.target.value})} />
              </FormGroup>
            </Col>
            <Col lg={2}>
              <FormGroup check >
                <Input type="checkbox" checked={createClientData.visible as boolean} onChange={e => setCreateClientData({...createClientData, visible: !createClientData.visible})} />
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
                value={createClientData.link}
                placeholder="https://exemplo.com"
                required
                onChange={(e) => setCreateClientData({...createClientData, link: e.target.value})}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            <Col lg={8}>
            <FormGroup>
              <Label>Imagem do cliente</Label>
              <UploaderComponent id='fileUpload' type='file' name='mainImage'selected={value => setCreateClientData({...createClientData, Image: value.filesData[0]})} autoUpload={false} />
            </FormGroup>
            </Col>
          </Row>
          <Row style={{marginTop: '1.5em'}}>
            <Col style={{textAlign: 'end'}}><Button color='success' >Criar</Button></Col>
          </Row>
        </Form>
      </Container>
    </>
  )
}

CreateClient.getLayout = (page: NextPage) => {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}

export default CreateClient

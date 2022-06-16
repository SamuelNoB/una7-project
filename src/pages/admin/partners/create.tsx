import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import { toast } from 'react-toastify';
import { NextPage } from "next"
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { Button, Col, Container, Form, FormGroup, Label, Row, Input } from "reactstrap"

import AdminLayout from "../../../layouts/AdminLayout"
import AdminHeader from "@components/admin/Header"
import PartnerService from '@services/PartnerService';

function CreatePartner() {
  const [partnerInput, setPartnerInput] = useState<createPartnerInput>({
    name: '',
    link: '',
    active: true,
    Image: '',
  })
  const router = useRouter();

  const partnerCreation = useMutation((newPartner: createPartnerInput) => { return PartnerService.createPartner(newPartner)}, {onSuccess: () => success() });

  function success() {
    router.push('/admin/partners');
    const message = 'Parceiro criado com sucesso!'
    toast.success(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      });
  }

  function onSubmit(event: any) {
    event.preventDefault()
    partnerCreation.mutate(partnerInput, {onSuccess: () => success() })
  }


  return (
  <>
  <Container>
    <AdminHeader title='Criar Parceiro' />
    <Form onSubmit={onSubmit}>
      <Row>
        <Col lg={8}>
          <FormGroup>
            <Label for='Name'>Nome do parceiro</Label>
            <Input
            value={partnerInput.name}
            required
            onChange={e => setPartnerInput({...partnerInput, name: e.target.value})}
            id='Name'
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for='Link'>Link para a Página do parceiro</Label>
            <Input
            value={partnerInput.link}
            type='url'
            required
            onChange={e => setPartnerInput({...partnerInput, link: e.target.value})}
            id='Link'
            ></Input>
          </FormGroup>
        </Col>
        <Col lg={4}>
          <FormGroup>
            <Label>Imagem do Parceiro</Label>
            <UploaderComponent id='fileUpload' type='file' name='mainImage'selected={value => setPartnerInput({...partnerInput, Image: value.filesData[0]})} autoUpload={false} />
          </FormGroup>
          <FormGroup check>
            <Input type="checkbox" checked={partnerInput.active as boolean} onChange={e => setPartnerInput({...partnerInput, active: !partnerInput.active})} />
            {' '}
            <Label check>
              Ativo
            </Label>
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



CreatePartner.getLayout = (page: NextPage) => {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}

CreatePartner.auth = true;
export default CreatePartner
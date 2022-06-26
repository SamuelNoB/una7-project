import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { Button, Col, Container, Form, FormGroup, Label, Row, Input } from "reactstrap"

import AdminHeader from "@components/admin/Header"
import PartnerService from '@services/PartnerService';
import { Partner } from '@prisma/client';

type props = {
  Partner?: Partner
}

function PartnerForm({Partner}: props) {
  const [partnerInput, setPartnerInput] = useState<createPartnerInput | updatePartnerInput>({
    name: '',
    link: '',
    active: true,
    Image: '',
  })
  const router = useRouter();

  useEffect(() => {
    if (Partner) {
      setPartnerInput({
        name: Partner.name,
        active: Partner.active,
        link: Partner.link,
      })
    }
  }, [Partner])

  const partnerCreation = useMutation((newPartner: createPartnerInput) => { return PartnerService.createPartner(newPartner)}, {onSuccess: () => success() });
  const partnerUpdate = useMutation((partnerUpdate: updatePartnerInput) => {return PartnerService.updatePartner({id: Partner?.id as number, body:partnerUpdate})}, {onSuccess: () => success()});
  function success() {
    router.push('/admin/partners');
    const message = Partner ? 'Parceiro atualizado com sucesso!': 'Parceiro criado com sucesso!'
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
    if (Partner) return onUpdate()
    onCreate()
  }
  function onCreate () {
    partnerCreation.mutate(partnerInput as createPartnerInput)
  }
  function onUpdate() {
    partnerUpdate.mutate(partnerInput as updatePartnerInput)
  }

  const title = Partner ?  'Atualizar Parceiro' : 'Criar Parceiro'
  const buttonText = Partner? 'Atualizar' : 'Criar'
  return (
  <>
  <Container>
    <AdminHeader title={title} />
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
            <Col xs="auto"><Button submit color='success' >{buttonText}</Button></Col>
          </Row>
    </Form>
    
  </Container>
  </>
  )
}

export default PartnerForm
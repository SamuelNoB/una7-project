import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { UploaderComponent,  } from '@syncfusion/ej2-react-inputs';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { Button, Col, Container, Form, Row, Input, FormGroup, Label } from "reactstrap"
import AdminHeader from "../Header"
import { useMutation } from "react-query";
import BannerService from "../../../services/BannerService";
import { toast } from "react-toastify";
import { Banner } from "@prisma/client";

type props = {
  Banner?: Banner
}
function BannerForm({Banner}: props ) {
  const router = useRouter()
  const [bannerData, setBannerData] = useState<createBannerInput | any>({
    Image: '',
    link: '',
    name: '',
    active: true
  });
  useEffect(() => {
    console.log(Banner);
    
    setBannerData({
      link: Banner?.link,
      name: Banner?.name,
      displayUntil: Banner?.displayUntil,
      active: Banner?.active
    })
  }, [Banner])


  const createBanner = useMutation((newBanner: createBannerInput) =>  {return BannerService.createBanner(newBanner)})
  const updateBanner = useMutation((newClient: createClientInput) =>  {return BannerService.updateBanner({id: Banner?.id as number, body:newClient})})

  function onSubmit(e: any) {
    e.preventDefault()
    if (Banner) return onUpdate();
    onCreate()
  }
  function onCreate() {
    createBanner.mutate(bannerData, {
      onSuccess: () => {
        const message ='Banner criado com sucesso!';
        toast.success(message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          });
        router.push('/admin/banners/')
      }
    })
  }

  function onUpdate() {
    updateBanner.mutate(bannerData, {
      onSuccess: () => {
        const message = 'Banner atualizado com sucesso!'
        toast.success(message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          });
        router.push('/admin/banners/')
      }
    })
  }

  const bannerTitle = ''
  return (
    <>
      <Container>
        <AdminHeader title={ !Banner ?'Adicionar banner': 'Atualizar banner'} />
        <Form onSubmit={onSubmit}>
          <Row className="d-flex justify-content-center">
            <Col lg={4}>
              <FormGroup>
                <Label>
                  Nome do banner
                </Label>
                < Input
                  type="text" 
                  placeholder="Banner do cliente 1"
                  required
                  value={bannerData.name} 
                  onChange={(e) => setBannerData({...bannerData, name: e.target.value})} />
              </FormGroup>
            </Col>
            <Col lg={2}>
              <FormGroup check >
                <Input type="checkbox" value={bannerData.active} checked={bannerData.active as boolean} onChange={e => setBannerData({...bannerData, active: !bannerData.active})} />
                {' '}
                <Label check>
                Banner visível
                </Label>
              </FormGroup>
            </Col>
            <Col lg={2}>
              <FormGroup>
                <Label>Visivel até</Label>
                <DatePickerComponent value={bannerData.displayUntil} onChange={(e: any) => setBannerData({...bannerData, displayUntil: e.value})} />
              </FormGroup>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            <Col lg={8}>
              <FormGroup>
                <Label>
                  Link do banner
                </Label>
                <Input 
                type="url"
                value={bannerData.link}
                placeholder="https://exemplo.com"
                required
                onChange={(e) => setBannerData({...bannerData, link: e.target.value})}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            <Col lg={8}>
            <FormGroup>
              <Label>Imagem do Banner</Label>
              <UploaderComponent id='fileUpload' type='file' name='mainImage'selected={value => setBannerData({...bannerData, Image: value.filesData[0]})} autoUpload={false} />
            </FormGroup>
            </Col>
          </Row>
          <Row className="justify-content-end" style={{margin: '1.5em 0'}}>
            <Col xs="auto">
              <Button outline color='secondary' onClick={() => router.back()}>
                Voltar
              </Button>
            </Col>
            <Col xs="auto"><Button submit color='success' >{!Banner ? 'Criar': 'Atualizar'}</Button></Col>
          </Row>
        </Form>
      </Container>
    </>
  )
}

export default BannerForm

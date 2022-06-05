import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import { ToastContainer, toast } from 'react-toastify';
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar, ToolbarSettingsModel } from '@syncfusion/ej2-react-richtexteditor';
import { NextPage } from "next"
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { Button, Col, Container, Form, FormGroup, Label, Row, Input } from "reactstrap"

import AdminHeader from "../../../components/admin/Header"
import AdminLayout from "../../../layouts/AdminLayout"

import PostService from "../../../services/PostService";

const items: string[] = ['Bold', 'Italic', 'Underline', 'StrikeThrough', 'LowerCase', 'UpperCase', '|',
'Formats', 'NumberFormatList', 'BulletFormatList',
'Outdent', 'Indent', 'SuperScript', 'SubScript', '|',
'CreateTable', 'CreateLink', 'Image', 'FullScreen', '|', 'Undo', 'Redo'
];
const toolbarSettings: ToolbarSettingsModel = {
  items: items,
};

function CreatePost() {
  const [postInput, setPostInput] = useState<createPostInput>({
    title: '',
    active: true,
    content: '',
    subtitle: '',
    coverImage: '',
  })
  const router = useRouter()
  const postCreation = useMutation<createPostInput, any, any>((newPost: createPostInput) => {
    return PostService.createPost(newPost)
  }, {onSuccess: () => success() });

  function success() {
    router.push('/admin');
    const message = 'Postagem criada com sucesso!'
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
    postCreation.mutate(postInput, {onSuccess: () => success() })
  }


  return (
  <>
  <Container>
    <AdminHeader title='Criar Postagem' />
    <Row style={{marginBottom: '1em'}}>
      <Col>
      <Button outline size='sm' color='secondary' onClick={() => router.back()}>
        Voltar
      </Button>
      </Col>
    </Row>
    <Form onSubmit={onSubmit}>
      <Row>
        <Col lg={8}>
          <FormGroup>
            <Label>Título da postagem</Label>
            <Input
            value={postInput.title}
            onChange={e => setPostInput({...postInput, title: e.target.value})}
            id='PostTitle'
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>Subtítulo da postagem</Label>
            <Input
            value={postInput.subtitle}
            onChange={e => setPostInput({...postInput, subtitle: e.target.value})}
            id='PostSubtitle'
            ></Input>
          </FormGroup>
        </Col>
        <Col lg={4}>
          <FormGroup>
            <Label>Imagem de capa</Label>
            <UploaderComponent id='fileUpload' type='file' name='mainImage'selected={value => setPostInput({...postInput, coverImage: value.filesData[0]})} autoUpload={false} />
          </FormGroup>
          <FormGroup check>
            <Input type="checkbox" checked={postInput.active as boolean} onChange={e => setPostInput({...postInput, active: !postInput.active})} />
            {' '}
            <Label check>
              Ativo
            </Label>
          </FormGroup>
        </Col>
      </Row>
      <Label>Conteúdo</Label>
      <RichTextEditorComponent toolbarSettings={toolbarSettings} change={ value => setPostInput({...postInput, content: value.value})} insertImageSettings={{saveFormat: 'Base64'}} value={postInput.content}>

          <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
      </RichTextEditorComponent>

    <Row style={{marginTop: '1.5em'}}>
      <Col style={{textAlign: 'end'}}><Button color='success' >Salvar</Button></Col>
    </Row>
    </Form>
    
  </Container>
  <ToastContainer />
  </>
  )
}



CreatePost.getLayout = (page: NextPage) => {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}

CreatePost.auth = true;
export default CreatePost
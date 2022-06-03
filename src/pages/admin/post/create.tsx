import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
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
  const postCreation = useMutation(newPost => {
    return PostService.createPost(newPost)
  });

  function onSubmit(event: any) {
    event.preventDefault()
    postCreation.mutate(postInput)
  }

  return (
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
            <Input type="checkbox" checked={postInput.active} onChange={e => setPostInput({...postInput, active: !postInput.active})} />
            {' '}
            <Label check>
              Ativo
            </Label>
          </FormGroup>
        </Col>
      </Row>
      <Label>Conteúdo</Label>
      <RichTextEditorComponent toolbarSettings={toolbarSettings} insertImageSettings={{saveFormat: 'Base64'}}>
          <p>The Rich Text Editor component is WYSIWYG ("what you see is what you get") editor that provides the best user experience to create and update the content. Users can format their content using standard toolbar commands.</p>
          <p><b>Key features:</b></p>
          <ul>
              <li>
                  <p>Provides &lt;IFRAME&gt; and &lt;DIV&gt; modes</p>
              </li>
              <li>
                  <p>Capable of handling markdown editing.</p>
              </li>
              <li>
                  <p>Contains a modular library to load the necessary functionality on demand.</p>
              </li>
              <li>
                  <p>Provides a fully customizable toolbar.</p>
              </li>
              <li>
                  <p>Provides HTML view to edit the source directly for developers.</p>
              </li>
              <li>
                  <p>Supports third-party library integration.</p>
              </li>
              <li>
                  <p>Allows preview of modified content before saving it.</p>
              </li>
              <li>
                  <p>Handles images, hyperlinks, video, hyperlinks, uploads, etc.</p>
              </li>
              <li>
                  <p>Contains undo/redo manager.</p>
              </li>
              <li>
                  <p>Creates bulleted and numbered lists.</p>
              </li>
          </ul>
          <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
      </RichTextEditorComponent>

    <Row style={{marginTop: '1.5em'}}>
      <Col style={{textAlign: 'end'}}><Button color='success' >Salvar</Button></Col>
    </Row>
    </Form>
  </Container>
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
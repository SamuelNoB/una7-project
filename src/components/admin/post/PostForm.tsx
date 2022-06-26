import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import { toast } from 'react-toastify';
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar, ToolbarSettingsModel } from '@syncfusion/ej2-react-richtexteditor';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { Button, Col, Container, Form, FormGroup, Label, Row, Input } from "reactstrap"

import AdminHeader from "../Header"

import PostService from "@services/PostService";
import { Publication } from '@prisma/client';

const items: string[] = ['Bold', 'Italic', 'Underline', 'StrikeThrough', 'LowerCase', 'UpperCase', '|',
'Formats', 'NumberFormatList', 'BulletFormatList',
'Outdent', 'Indent', 'SuperScript', 'SubScript', '|',
'CreateTable', 'CreateLink', 'Image', 'FullScreen', '|', 'Undo', 'Redo'
];
const toolbarSettings: ToolbarSettingsModel = {
  items: items,
};

type props = {
  Post?: Publication
}

function PostForm({Post}: props ) {
  
  const [postInput, setPostInput] = useState<createPostInput | updatePostInput>({
    title: '',
    active: true,
    content: '',
    subtitle: '',
    Image: '',
  })
  const router = useRouter();
  const postCreation = useMutation((newPost: createPostInput) => { return PostService.createPost(newPost)}, {onSuccess: () => success() });
  const postUpdate = useMutation((postUpdate: updatePostInput) => {return PostService.updatePost({id: Post?.id as number, body: postUpdate})}, {onSuccess: () => success() })

  useEffect(() => {
    if (Post) {
      setPostInput({
        title: Post.title,
        active: Post.active,
        content: Post.content,
        subtitle: Post.subTitle,
      })
    }
  }, [Post])


  function success() {
    router.push('/admin');
    const message = Post ? 'Postagem atualizada com sucesso!': 'Postagem criada com sucesso!'
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
    if (Post) return onUpdate()
    onCreate()
  }

  function onCreate() {
    postCreation.mutate(postInput as createPostInput) 
  }

  function onUpdate() {
    postUpdate.mutate(postInput as updatePostInput);
  }

  const title = Post ?  'Atualizar postagem' : 'Criar Postagem'
  const buttonText = Post? 'Atualizar' : 'Criar'
  return (
  <>
  <Container>
    <AdminHeader title={title} />
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
            <UploaderComponent id='fileUpload' type='file' name='mainImage'selected={value => setPostInput({...postInput, Image: value.filesData[0]})} autoUpload={false} />
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




export default PostForm
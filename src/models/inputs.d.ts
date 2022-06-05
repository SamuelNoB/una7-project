
type ContactInput = {
  fullName: string,
  email: string,
  subject: string,
  message: string,
}

type createPostInput = {
  active: boolean | string,
  title: string,
  coverImage?: string | any,
  subtitle: string,
  content: string,
}

type updatePostInput = {
  active?: Boolean,
  title?: string,
  subtitle?: string,
  content?: string,
}
type updatePostBody = {
  id: number,
  body: updatePostBody
}

type createPartnerInput = {
  name: string,
  link: string,
  active: boolean,
}

type createClientInput = {
  visible: boolean,
  name: string,
  link: string
}

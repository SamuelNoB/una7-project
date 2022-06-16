
type ContactInput = {
  fullName: string,
  email: string,
  subject: string,
  message: string,
}

type createPostInput = {
  active: boolean | string,
  title: string,
  Image?: string | any,
  subtitle: string,
  content: string,
}

type updatePostInput = {
  active?: Boolean,
  title?: string,
  subtitle?: string,
  content?: string,
  Image?: string | any,
}
type updatePostBody = {
  id: number,
  body: updatePostBody
}

type createPartnerInput = {
  name: string,
  link: string,
  Image: string | any,
}

type updatePartnerInput = {
  name?: string,
  link?: string,
  active?: boolean,
  image?: string | any,
}

type createClientInput = {
  visible: boolean | string,
  name: string,
  link: string,
  Image: any
}

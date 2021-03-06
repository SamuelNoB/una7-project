
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
  active?: boolean,
  title?: string,
  subtitle?: string,
  content?: string,
  Image?: string | any,
}
type updatePostBody = {
  id: number,
  body: updatePostInput
}

type updatePartnerBody = {
  id: number,
  body: updatePartnerInput
}
type createPartnerInput = {
  name: string,
  link: string,
  active: boolean
  Image: string | any,
}

type updatePartnerInput = {
  name?: string,
  link?: string,
  active?: boolean,
  Image?: string | any,
}

type createClientInput = {
  visible: boolean | string,
  name: string,
  link: string,
  Image: any
}

type createBannerInput = {
  active: boolean | string,
  name: string,
  link: string,
  displayUntil?: any,
  Image: any
}

type updateBannerBody = {
  id: number,
  body: updateBannerInput
}

type updateBannerInput = {
  active?: boolean | string,
  name?: string,
  link?: string,
  displayUntil?: any,
  Image?: any
}

type updateClientBody = {
  id: number,
  body: updateClientInput
}
type updateClientInput = {
  visible?: boolean | string,
  name?: string,
  link?: string,
  Image?: any
}

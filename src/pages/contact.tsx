import DefaultLayout from "../layouts/DefaultLayout"

function blogIndex(props: any) {
  return (
    <>
      hello this is contactPage
    </>
  )
}

blogIndex.getLayout = (page: any) => {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export default blogIndex
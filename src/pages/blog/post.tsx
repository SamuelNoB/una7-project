import DefaultLayout from "../../layouts/DefaultLayout"

function blogIndex(props: any) {
  return (
    <>
      hello this is Post page
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
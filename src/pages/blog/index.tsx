import DefaultLayout from "../../layouts/DefaultLayout"

function blogIndex(props: any) {
  return (
    <>
      hello this is blog page
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
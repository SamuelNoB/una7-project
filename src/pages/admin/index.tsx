import { NextPage } from "next"
import { Container } from "reactstrap"
import AdminHeader from "../../components/admin/Header"
import AdminLayout from "../../layouts/AdminLayout"

function AdminIndex(props: any) {
  return (
  <Container>
    <AdminHeader title={'Publicações'} />
    admin page
  </Container>
  )
}


AdminIndex.getLayout = (page: NextPage) => {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}

AdminIndex.auth = true;
export default AdminIndex
import { NextPage } from "next"
import { Container } from "reactstrap"
import AdminLayout from "../../layouts/AdminLayout"

function AdminIndex(props: any) {
  return (<Container>admin page</Container>)
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
import { NextPage } from "next"
import AdminLayout from "../../layouts/AdminLayout"

function AdminIndex(props: any) {
  return (<>admin page</>)
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
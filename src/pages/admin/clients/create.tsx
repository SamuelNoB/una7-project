import ClientForm from "@components/admin/clients/ClientForm";
import AdminLayout from "layouts/AdminLayout";
import { NextPage } from "next";
function UpdateClient() {
  return (<ClientForm />)
}

UpdateClient.getLayout = (page: NextPage) => {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}

UpdateClient.auth = true;

export default UpdateClient
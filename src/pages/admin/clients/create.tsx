import ClientForm from "@components/admin/clients/ClientForm";
import AdminLayout from "layouts/AdminLayout";
import { NextPage } from "next";
function CreateClient() {
  return (<ClientForm />)
}

CreateClient.getLayout = (page: NextPage) => {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}

CreateClient.auth = true;

export default CreateClient
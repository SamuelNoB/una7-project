import PartnerForm from "@components/admin/partners/PartnerForm";
import AdminLayout from "layouts/AdminLayout";
import { NextPage } from "next";

function CreatePartner() {
  return (
    <PartnerForm />
  )
}

CreatePartner.getLayout = (page: NextPage) => {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}
CreatePartner.auth = true;

export default CreatePartner
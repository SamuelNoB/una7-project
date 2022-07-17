import BannerForm from "@components/admin/banners/BannerForm";
import AdminLayout from "layouts/AdminLayout";
import { NextPage } from "next";

function CreateBanner() {
  return (
    <>
    <BannerForm />
    </>
  )
}

CreateBanner.getLayout = (page: NextPage) => {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}
CreateBanner.auth = true
export default CreateBanner
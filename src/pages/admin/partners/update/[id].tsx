
import PartnerForm from "@components/admin/partners/PartnerForm";
import PartnerService from "@services/PartnerService";
import AdminLayout from "layouts/AdminLayout";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

function UpdatePartner() {
  const router = useRouter()
  const {id} = router.query;
  const {data, error} = useQuery(['getOnePartner', { id }], PartnerService.getOnePartner)
  return (
    <PartnerForm Partner={data} />
  )
}

UpdatePartner.getLayout = (page: NextPage) => {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}
UpdatePartner.auth = true;

export default UpdatePartner
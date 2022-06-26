import ClientForm from "@components/admin/clients/ClientForm";
import ClientService from "@services/ClientService";
import AdminLayout from "layouts/AdminLayout";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

function UpdateClient() {
  const router = useRouter();
  const {id} = router.query;
  
  const {data, error} = useQuery(['getOneClient', { id }], ClientService.getOneClient) as any
  return (<ClientForm Client={data} />)
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
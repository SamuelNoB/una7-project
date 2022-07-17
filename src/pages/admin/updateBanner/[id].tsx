import BannerForm from "@components/admin/banners/BannerForm";
import { Banner } from "@prisma/client";
import ClientService from "@services/ClientService";
import AdminLayout from "layouts/AdminLayout";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

function UpdateBanner() {
  const router = useRouter();
  const {id} = router.query;
  //const {data, error} = useQuery(['getOneClient', { id }], ClientService.getOneClient) as any
  const data: Banner = {
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    displayUntil: new Date(),
    id: 1,
    image: 'asdfewrqe',
    imageType: '.png',
    link: 'https://twitter.com/home',
    name: 'teste'
  }
  return (<BannerForm Banner={data} />)
}

UpdateBanner.getLayout = (page: NextPage) => {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}

UpdateBanner.auth = true;

export default UpdateBanner
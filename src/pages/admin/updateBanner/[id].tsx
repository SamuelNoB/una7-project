import BannerForm from "@components/admin/banners/BannerForm";
import { Banner } from "@prisma/client";
import BannerService from "@services/BannerService";
import AdminLayout from "layouts/AdminLayout";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

function UpdateBanner() {
  const router = useRouter();
  const {id} = router.query;
  const [bannerToUpdate , setBannerToUpdate] = useState<Banner>()
  const {data, error} = useQuery(['getBanners', { onlyActive: false }], BannerService.getAllBanners) as any
  useEffect(() => {
    if (data)
      setBannerToUpdate(data.find( (banner: Banner) => banner.id === Number(id)))
  }, [data])
  return (<BannerForm Banner={bannerToUpdate} />)
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
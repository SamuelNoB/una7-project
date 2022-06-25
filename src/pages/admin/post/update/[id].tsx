import PostForm from "@components/admin/post/PostForm";
import PostService from "@services/PostService";
import AdminLayout from "layouts/AdminLayout";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

function UpdatePost() {
  const router = useRouter();
  const {id} = router.query;
  
  const {data, error} = useQuery(['getOnePost', { id }], PostService.getOnePost)
  return (<PostForm Post={data} />)
}

UpdatePost.getLayout = (page: NextPage) => {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}

UpdatePost.auth = true;

export default UpdatePost
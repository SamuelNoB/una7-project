import PostForm from "@components/admin/post/PostForm";
import AdminLayout from "layouts/AdminLayout";
import { NextPage } from "next";

function CreatePost() {
  return (
    <PostForm />
  )
}

CreatePost.getLayout = (page: NextPage) => {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}
CreatePost.auth = true;

export default CreatePost
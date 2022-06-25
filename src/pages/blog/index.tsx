import DefaultLayout from "../../layouts/DefaultLayout"
import { Container, Row, Col } from "reactstrap";
import BlogCard from "../../components/BlogCard"
import { useQuery } from "react-query";
import PostService from "../../services/PostService";
import { useEffect, useState } from "react";

function BlogIndex(props: any) {
  const {data, error, isLoading} = useQuery('getLastPosts', PostService.getAllPost)

  const [postList, setPostList] = useState<SmallPublication[]>([])

  useEffect(() => {
    if (data) {
      setPostList(data)
    }

  }, [data,])
  
  return (
    <>
      <Container >
        <Row style={{margin: '2em 0 4em 0'}} className="justify-content-center">
          <Col lg={2}>
            <h2 style={{textAlign: 'center'}}>Blog</h2>
          </Col>
        </Row>
        <Row style={{margin: '2em 0'}} >
          {
          postList.map(post => {
            return (<Col key={post.id} lg={4} style={{margin: '0.8em 0'}}>
              <BlogCard params={post} full={true} />
            </Col>)
          })
          }
        </Row>
      </Container>
    </>
  )
}

BlogIndex.getLayout = (page: any) => {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export default BlogIndex
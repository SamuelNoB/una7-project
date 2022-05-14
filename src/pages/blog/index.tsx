import DefaultLayout from "../../layouts/DefaultLayout"
import { Container, Row, Col } from "reactstrap";
import BlogCardFull from "../../components/BlogCardFull";

interface PostCard {
  id: string | number,
  image: string,
  title: string,
  subtitle?: string,
  createdAt: Date
}
function blogIndex(props: any) {
  const postList: PostCard[] = [
    {
      id: 1,
      title: 'some title',
      image: 'images/mountain.jpeg',
      createdAt: new Date(),
      subtitle: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque inventore nisi adipisci at, facere commodi! Incidunt et voluptatum rem quo earum ex labore laboriosam hic fugit temporibus! Maxime, quibusdam ab.'
    },
    {
      id: 2,
      title: 'some title 2',
      image: 'images/balloon.jpeg',
      createdAt: new Date(),
      subtitle: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque inventore nisi adipisci at, facere commodi! Incidunt et voluptatum rem quo earum ex labore laboriosam hic fugit temporibus! Maxime, quibusdam ab.'
    },
    {
      id: 3,
      title: 'some title 3',
      image: 'images/beach.jpeg',
      createdAt: new Date(),
      subtitle: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque inventore nisi adipisci at, facere commodi! Incidunt et voluptatum rem quo earum ex labore laboriosam hic fugit temporibus! Maxime, quibusdam ab.'
    }
  ]
  return (
    <>
      <Container >
        <Row style={{margin: '2em 0 4em 0'}} className="justify-content-center">
          <Col lg={2}>
            <h2 style={{textAlign: 'center'}}>Blog</h2>
          </Col>
        </Row>
        <Row style={{margin: '24px 0'}}>
          <Col lg={4}>
          <BlogCardFull params={postList[0]}></BlogCardFull>
          </Col>
          <Col lg={4}>
          <BlogCardFull params={postList[1]}></BlogCardFull>
          </Col>
          <Col lg={4}>
          <BlogCardFull params={postList[2]}></BlogCardFull>
          </Col>
        </Row>
      </Container>
    </>
  )
}

blogIndex.getLayout = (page: any) => {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export default blogIndex
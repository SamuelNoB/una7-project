import DefaultLayout from "layouts/DefaultLayout";
import { Col, Container, Row } from "reactstrap";

function AboutUs() {
  return (
  <>
    <Container style={{marginBottom: '3em', marginTop: '2em'}}>
      <h1 style={{textAlign: 'center'}}>Sobre nós</h1>
    <Row style={{marginTop: '6em'}} className="justify-content-center">
        <Col lg={9}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae amet enim vitae maiores eveniet blanditiis id et, voluptatum voluptatem veritatis distinctio eaque aliquam velit, nesciunt optio quas suscipit, laboriosam facilis!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, est perferendis? Natus quod odit nostrum a. Voluptas, pariatur debitis aut nobis libero, voluptate, et eaque laudantium aspernatur praesentium cum vitae!
        </Col>
      </Row>
    </Container>
  </>
  ) 
}

AboutUs.getLayout = function getLayout(page: any) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export default AboutUs
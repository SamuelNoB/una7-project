import { Col, Row } from "reactstrap";


export default function AdminHeader({title}: any) {
  return (
  <Row style={{marginBottom: '1.5em'}}>
    <Col>
      <h1 className="text-center">{title}</h1>
    </Col>
  </Row>
  )
}
import { NextPage } from "next"
import { Button, Col, Container, Row } from "reactstrap"
import { Publication } from "@prisma/client";
import { ColumnDirective, ColumnsDirective, GridComponent } from '@syncfusion/ej2-react-grids';
import { AiOutlinePlus } from "react-icons/ai";

import AdminHeader from "../../components/admin/Header"
import AdminLayout from "../../layouts/AdminLayout"
import { useRouter } from "next/router";

type column = {
  field: string,
  headerText: string
  width: string
}

const columns: column[] = [
  {
    field: 'id',
    headerText: 'ID Publicação',
    width: '80'
  },
  {
    field: 'title',
    headerText: 'Título',
    width: '100'
  },
  {
    field: 'createdAt',
    headerText: 'Criado em',
    width: '100'
  }
]
function AdminIndex(props: any) {

  const router = useRouter()


  return (
  <Container>
    <AdminHeader title={'Publicações'} />

    <Row style={{marginBottom: '1.5em'}}>
      <Col style={{textAlign: 'end'}}>
        <Button style={{backgroundColor: 'rgba(169, 81, 139, 1)'}} onClick={() => router.push('/admin/post/create')}>
        <AiOutlinePlus /> Criar Publicação
        </Button>
      </Col>
    </Row>
    <GridComponent>
      <ColumnsDirective>
        {
          columns.map(column => {
            return (<ColumnDirective key={column.field} field={column.field} headerText={column.headerText} width={column.width} textAlign="Right"/>)
          })
        }
      </ColumnsDirective>
    </GridComponent>
  </Container>
  )
}


AdminIndex.getLayout = (page: NextPage) => {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}

AdminIndex.auth = true;
export default AdminIndex
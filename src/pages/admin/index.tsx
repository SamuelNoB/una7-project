import { NextPage } from "next"
import { Button, Col, Container, Row } from "reactstrap"
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import dayjs from 'dayjs';
import { Publication } from "@prisma/client";
import { ColumnDirective, ColumnsDirective, GridComponent } from '@syncfusion/ej2-react-grids';
import { AiOutlineAppstore, AiOutlinePlus } from "react-icons/ai";

import AdminHeader from "../../components/admin/Header"
import AdminLayout from "../../layouts/AdminLayout"
import PostService from '../../services/PostService'
import { useEffect, useState } from "react";

type column = {
  field: string,
  headerText: string
  width: string
}

const columns: column[] = [
  {
    field: 'id',
    headerText: 'ID Publicação',
    width: '50'
  },
  {
    field: 'title',
    headerText: 'Título',
    width: '150'
  },
  {
    field: 'createdAt',
    headerText: 'Criado em',
    width: '100'
  },
  {
    field: 'commands',
    headerText: 'Comandos',
    width: '50'
  }
]
function AdminIndex(props: any) {

  const router = useRouter()
    const {data, error} = useQuery('getAllPost', PostService.getAllPost);
    const [posts, setPosts] = useState<SmallPublication[]>([]);
    useEffect(() => {
      if (data) {
        
        const parsedData = data.map( aPost => ({...aPost, createdAt: dayjs(aPost.createdDate).format('DD/MM/YYYY')}))
        setPosts(parsedData);
      }
    }
    , [data])

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
    <GridComponent dataSource={posts}>
      <ColumnsDirective>
        {
          columns.map(column => {
            return (<ColumnDirective key={column.field} field={column.field} headerText={column.headerText} width={column.width} textAlign="Left"/>)
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
import { NextPage } from "next"
import { Button, Col, Container, Row } from "reactstrap"
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import dayjs from 'dayjs';
import { ColumnDirective, ColumnsDirective, GridComponent} from '@syncfusion/ej2-react-grids';
import { AiOutlinePlus } from "react-icons/ai";

import AdminHeader from "../../components/admin/Header"
import AdminLayout from "../../layouts/AdminLayout"
import PostService from '../../services/PostService'
import { useEffect, useState } from "react";
import Commands from "../../components/admin/post/Commands";

import { createRoot } from 'react-dom/client';
import DeleteModal from "../../components/admin/post/DeleteModal";

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
    field: 'createdDate',
    headerText: 'Criado em',
    width: '80'
  },
  {
    field: 'commands',
    headerText: 'Comandos',
    width: '80'
  }
]
function AdminIndex(props: any) {

  const router = useRouter()
  const {data, error} = useQuery('getAllPost', PostService.getAllPost);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
  const [deleteData, setDeleteData] = useState<SmallPublication>()
  const [posts, setPosts] = useState<SmallPublication[]>([]);
  useEffect(() => {
    if (data) {
      
      const parsedData = data.map( aPost => 
        ({...aPost, 
          createdDate: dayjs(aPost.createdDate).format('DD/MM/YYYY')
        }))
      setPosts(parsedData);
    }
  }
  , [data])

  function openDeleteModal(publicationData: SmallPublication) {
    setDeleteData(publicationData)
    setDeleteModalIsOpen(!deleteModalIsOpen);
  }

  function commands(args: any) {
    if (args.column.field === "commands") {
        const rowData = args.data as SmallPublication
        console.log(rowData);
        
        const root = createRoot(args.cell);
        root.render(<Commands key={rowData.id} data={rowData} update={(data: any) => 0} delete={openDeleteModal} />)
    }
  }

  return (
  <>
  <Container>
    <AdminHeader title={'Publicações'} />

    <Row style={{marginBottom: '1.5em'}}>
      <Col style={{textAlign: 'end'}}>
        <Button style={{backgroundColor: 'rgba(169, 81, 139, 1)'}} onClick={() => router.push('/admin/post/create')}>
        <AiOutlinePlus /> Criar Publicação
        </Button>
      </Col>
    </Row>
    <GridComponent dataSource={posts} queryCellInfo={commands}>
      <ColumnsDirective>
        {
          columns.map(column => {
            return (<ColumnDirective key={column.field} field={column.field} headerText={column.headerText} width={column.width} textAlign="Left"/>)
          })
        }
      </ColumnsDirective>
    </GridComponent>
  </Container>
  <DeleteModal open={deleteModalIsOpen} data={deleteData} closeModal={() => setDeleteModalIsOpen(!deleteModalIsOpen)} />
  </>
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
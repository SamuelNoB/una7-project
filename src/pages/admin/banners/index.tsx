import DeleteModal from "@components/admin/clients/DeleteModal"
import AdminHeader from "@components/admin/Header"
import Commands from "@components/admin/post/Commands"
import { Client } from "@prisma/client"
import ClientService from "@services/ClientService"
import { ColumnDirective, ColumnsDirective, GridComponent } from "@syncfusion/ej2-react-grids"
import AdminLayout from "layouts/AdminLayout"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"
import { createRoot } from "react-dom/client";

import { useQuery } from "react-query"
import { toast } from "react-toastify"
import { Button, Col, Container, Row } from "reactstrap"
import Link from "next/link"

type column = {
  field: string,
  headerText: string
  width: string
}

const columns: column[] = [
  {
    field: 'id',
    headerText: 'ID Cliente',
    width: '50'
  },

  {
    field: 'name',
    headerText: 'Nome',
    width: '150'
  },
  {
    field: 'visibleText',
    headerText: 'Visível',
    width: '80'
  },
  {
    field: 'commands',
    headerText: 'Comandos',
    width: '80'
  }
]



function BannersIndex() {
  const router = useRouter()
  const [clients, setClients] = useState<Client[]>([])
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
  const [deleteData, setDeleteData] = useState<Partial<Client>>()
  const {data, error} = useQuery('getClients', ClientService.getAllClients)

  useEffect(() => {
    if (data) {

      setClients(data.map((client) => { return {...client, visibleText: client.visible ? 'Sim': 'Não'}}));
    }
  }, [data])

  function openDeleteModal(clientData: Client) {
    setDeleteData(clientData)
    setDeleteModalIsOpen(!deleteModalIsOpen);
  }
  function goToUpdate(clientData: Client) {
    router.push(`/admin/clients/update/${clientData.id}`)
  }

  function afterDeleted(id: string) {
    toast.success('Banner excluido com sucesso', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      });
  }

  function commands(args: any) {
    if (args.column.field === "commands") {
        const rowData = args.data as Client
        const root = createRoot(args.cell);
        root.render(<Commands key={rowData.id} data={rowData} update={goToUpdate} delete={openDeleteModal} />)
    }
  }

  return (
  <>
    <Container>
      <AdminHeader title={'Banners'} />
      <Row style={{marginBottom: '1.5em'}}>
        <Col style={{textAlign: 'end'}}>
          <Link href='/admin/createBanner'>
            <a >
              <Button style={{backgroundColor: 'rgba(169, 81, 139, 1)'}}>
              <AiOutlinePlus /> Criar Banner
              </Button>
            </a>
          </Link>
        </Col>
      </Row>
      <GridComponent dataSource={clients} queryCellInfo={commands}>
      <ColumnsDirective>
        {
          columns.map(column => {
            return (<ColumnDirective key={column.field} field={column.field} headerText={column.headerText} width={column.width} textAlign="Left"/>)
          })
        }
      </ColumnsDirective>
    </GridComponent>
    </Container>
    <DeleteModal open={deleteModalIsOpen} data={deleteData} afterDeleted={afterDeleted} closeModal={() => setDeleteModalIsOpen(!deleteModalIsOpen)} />
  </>
  )
}


BannersIndex.getLayout = (page: NextPage) => {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}
BannersIndex.auth = true;
export default BannersIndex

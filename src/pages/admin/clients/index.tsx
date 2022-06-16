import { NextPage } from "next"
import { ColumnDirective, ColumnsDirective, GridComponent} from '@syncfusion/ej2-react-grids';
import { Button, Col, Container, Row } from "reactstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { createRoot } from "react-dom/client";
import { useQuery } from "react-query";

import AdminLayout from "../../../layouts/AdminLayout"
import Commands from "../../../components/admin/post/Commands";
import AdminHeader from "../../../components/admin/Header";
import ClientService from "../../../services/ClientService";
import { useEffect, useState } from "react";
import { Client } from "@prisma/client";
import DeleteModal from "../../../components/admin/clients/DeleteModal";



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

function ClientIndex(params: any) {
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

  function afterDeleted(id: string) {
    toast.success('Publicação excluida com sucesso', {
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
        root.render(<Commands key={rowData.id} data={rowData} update={(data: any) => 0} delete={openDeleteModal} />)
    }
  }

  return (
  <>
    <Container>
      <AdminHeader title={'Clientes'} />
      <Row style={{marginBottom: '1.5em'}}>
        <Col style={{textAlign: 'end'}}>
          <Button style={{backgroundColor: 'rgba(169, 81, 139, 1)'}} onClick={() => router.push('/admin/clients/create')}>
          <AiOutlinePlus /> Adicionar Cliente
          </Button>
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

ClientIndex.getLayout = (page: NextPage) => {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}


export default ClientIndex
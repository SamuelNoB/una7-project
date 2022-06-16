import { NextPage } from "next"
import { Button, Col, Container, Row } from "reactstrap"
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import dayjs from 'dayjs';
import { ColumnDirective, ColumnsDirective, GridComponent} from '@syncfusion/ej2-react-grids';
import { AiOutlinePlus } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify"

import AdminHeader from "@components/admin/Header"
import AdminLayout from "../../../layouts/AdminLayout"
import PartnerService from '@services/PartnerService'
import { useEffect, useState } from "react";
import Commands from "@components/admin/post/Commands";

import { createRoot } from 'react-dom/client';
import DeleteModal from "@components/admin/partners/DeleteModal";
import { Partner } from ".prisma/client";

type column = {
  field: string,
  headerText: string
  width: string
}

const columns: column[] = [
  {
    field: 'id',
    headerText: 'ID do parceiro',
    width: '50'
  },
  {
    field: 'name',
    headerText: 'Nome',
    width: '150'
  },
  {
    field: 'active',
    headerText: 'Ativo',
    width: '80'
  },
  {
    field: 'commands',
    headerText: 'Comandos',
    width: '80'
  }
]
function PartnerIndex(props: any) {

  const router = useRouter()
  const {data, error} = useQuery('getAllPartners', PartnerService.getAll);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
  const [deleteData, setDeleteData] = useState<Partner>()
  const [partners, setPartners] = useState<Partner[]>([]);
  useEffect(() => {
    if (data) {
      setPartners(data.data);
    }
  }
  , [data])

  function openDeleteModal(partnerData: Partner) {
    setDeleteData(partnerData)
    setDeleteModalIsOpen(!deleteModalIsOpen);
  }

  function commands(args: any) {
    if (args.column.field === "commands") {
        const rowData = args.data as Partner
        const root = createRoot(args.cell);
        root.render(<Commands key={rowData.id} data={rowData} update={(data: any) => 0} delete={openDeleteModal} />)
    }
  }
  function afterDeleted(id: number) {
    toast.success('Publicação excluida com sucesso', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      });
  
    const partnerIndex =  partners.findIndex(partner => partner.id === id)
    partners.splice(partnerIndex,1);
    setPartners([...partners]);
  }

  return (
  <>
  <Container>
    <AdminHeader title={'Parceiros'} />

    <Row style={{marginBottom: '1.5em'}}>
      <Col style={{textAlign: 'end'}}>
        <Button style={{backgroundColor: 'rgba(169, 81, 139, 1)'}} onClick={() => router.push('/admin/partners/create')}>
        <AiOutlinePlus /> Criar Parceiro
        </Button>
      </Col>
    </Row>
    <GridComponent dataSource={partners} queryCellInfo={commands}>
      <ColumnsDirective>
        {
          columns.map(column => {
            return (<ColumnDirective key={column.field} field={column.field} headerText={column.headerText} width={column.width} textAlign="Left"/>)
          })
        }
      </ColumnsDirective>
    </GridComponent>
    <ToastContainer />
  </Container>
  <DeleteModal open={deleteModalIsOpen} data={deleteData} afterDeleted={afterDeleted} closeModal={() => setDeleteModalIsOpen(!deleteModalIsOpen)} />
  </>
  )
}


PartnerIndex.getLayout = (page: NextPage) => {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}

PartnerIndex.auth = true;
export default PartnerIndex
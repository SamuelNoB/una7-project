import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router'
import { IoMdArrowRoundBack } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import {BsFillFileEarmarkPostFill, BsPerson} from "react-icons/bs"
import {HiOutlineBookmark} from 'react-icons/hi';
import {AiOutlineFileExcel} from 'react-icons/ai'
import {RiSuitcaseLine} from 'react-icons/ri'

import {Navigation, NavItemProps} from 'react-minimal-side-navigation';
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import { Col, Row } from "reactstrap";
import { useQuery } from "react-query";
import ContactService from "@services/ContactService";
import { useEffect, useState } from "react";

import {utils, writeFile} from 'xlsx';

function AdminLayout({children}: any) {
  const {data, error, isLoading} = useQuery('getSenders', ContactService.listMessages)
  const [sendersData, setSendersData] = useState<any>();

  const { data: session, status } = useSession()
  const router = useRouter();

  useEffect(() => {
    if (data) {
      setSendersData(data);
    }
  }, [data]);

  function createExcel() {
    const wb = utils.book_new();
    const ws = utils.json_to_sheet(data as any)
    utils.book_append_sheet(wb, ws, 'Contatos')
    writeFile(wb, 'Contatos.xlsx')
  }

  const routes: NavItemProps[] = [
    {
      itemId: '/admin',
      title: 'Postagens',
      elemBefore: () => (<BsFillFileEarmarkPostFill />)
    },
    {
      itemId: '/admin/partners',
      title: 'Parceiros',
      elemBefore: () => (<BsPerson />)
    },
    {
      itemId: '/admin/clients',
      title: 'Clientes',
      elemBefore: () => (<RiSuitcaseLine />)
    },
    {
      itemId: '/admin/banners',
      title: 'Banners',
      elemBefore: () => (<HiOutlineBookmark />)
    },
    {
      itemId: 'Exportar',
      title: 'Exportar clientes',
      elemBefore: () => (<AiOutlineFileExcel/>)
    },
    {
      itemId: '/',
      title: 'Ir para site',
      elemBefore: () => (<IoMdArrowRoundBack />)
    },
    {
      itemId: 'Sair',
      title: 'Deslogar',
      elemBefore: () => <BiLogOut />
    }
  ]

  return (
  <Row style={{margin: 0, padding: 0}}>
    <Col lg={2}  style={{backgroundColor: '#f8f9fa', padding: 0, height: '100vh', borderRight: '1px solid #E3E3E3',}}>
        <div style={{marginLeft: '1em'}}>
          <h4>Una7</h4>
          <p className="font-weight-light">{session?.user?.name}</p>
        </div>
        <Navigation
        activeItemId="/admin"
        onSelect={({itemId}) => {
          if (itemId === 'Sair') {
            signOut({callbackUrl: '/'})
            return
          }
          if(itemId === 'Exportar') {
            return createExcel()
          }
          router.push(itemId);
        }}
        items={routes}
        />
    </Col>
    <Col style={{paddingRight: 0}}>
      <div>
        {children}
      </div>
    </Col>
  </Row>
  )
}
export default AdminLayout
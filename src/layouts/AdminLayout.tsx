import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router'
import { useState, useEffect } from "react";
import Image from 'next/image'

import logo from '../static/images/LogoUna7.jpg'
import {Navigation, NavItemProps} from 'react-minimal-side-navigation';
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import { Col, Row } from "reactstrap";


function AdminLayout({children}: any) {
  const { data: session, status } = useSession()
  const router = useRouter();

  const routes: NavItemProps[] = [
    {
      itemId: '/admin',
      title: 'Principal',
    },
    {
      itemId: '/admin2',
      title: 'Principal2',
    }
  ]

  return (
  <Row>
    <Col lg={2} style={{backgroundColor: '#f8f9fa', height: '100vh', borderRight: '1px solid #E3E3E3',}}>
      <Navigation
      activeItemId="/admin"
      onSelect={({itemId}) => {
        router.push(itemId);
      }}
      items={routes}
      />
    </Col>
    <Col lg={10} style={{paddingRight: 0}}>
      <div>
        {children}
      </div>
    </Col>
  </Row>
  )
}
export default AdminLayout
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

import { Container } from "reactstrap";

import DefaultLayout from '../layouts/DefaultLayout'

const Home = () => {
  return (
    <>
      <div style={{backgroundImage: `url(images/camp.jpeg)`}}>
        home
      </div>
    </>
  )
}

Home.getLayout = function getLayout(page: any) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export default Home

import type { NextPage } from 'next'

import styles from '../styles/Home.module.css'

import DefaultLayout from '../layouts/DefaultLayout'

const Home = () => {
  return (
    <>hello world</>
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

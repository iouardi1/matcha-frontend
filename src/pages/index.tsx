import { Home } from '@/components/Home'
import type { ReactElement } from 'react'
// import NestedLayout from '../components/nested-layout'
import type { NextPageWithLayout } from './_app'
import React from 'react'
import Layout from '@/components/layout'
import SideBar from './accueil/sideBar'

const Page: NextPageWithLayout = () => {
  return (
    <Home/>
  )
}
 
// Page.getLayout = function getLayout(page: ReactElement) {
//   return (
//     <Layout>
//       <Page/>
//     </Layout>
//   )
// }
 
export default Page
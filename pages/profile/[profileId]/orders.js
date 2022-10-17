import Layout from '../../../components/profile/tes/layout'
import ProfileSidebar from '../../../components/profile/ProfileSidebar'
import Page from '../../../components/Page'
export default function About() {
  return (
    <Page title={"Orders - Sober"} description={"List Orders"}>
    <Layout>
      <ProfileSidebar active={"orders"}/>
    <div className='p-4' style={{width: "100%"}}>
      <h3>Tinggal Import Component</h3>
    </div>
    </Layout>
    </Page>
  )
}

// About.getLayout = function getLayout(page) {
//   return (
//     <Layout>
//       <Sidebar />
//       {page}
//     </Layout>
//   )
// }

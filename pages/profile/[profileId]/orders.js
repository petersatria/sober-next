import Layout from '../../../components/profile/tes/layout'
import ProfileSidebar from '../../../components/profile/ProfileSidebar'

export default function About() {
  return (
    <Layout>
      <ProfileSidebar active={"orders"}/>
    <div className='p-4' style={{width: "100%"}}>
      <h3>Tinggal Import Component</h3>
    </div>
    </Layout>
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

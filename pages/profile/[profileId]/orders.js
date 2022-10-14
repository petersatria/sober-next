import Layout from '../../../component/tes/layout'
import ProfileSidebar from '../../../component/profile/ProfileSidebar'

export default function About() {
  return (
    <Layout>
      <ProfileSidebar active={"orders"}/>
    <div className='p-4' style={{width: "100%"}}>
      <h1>Hello Orders</h1>
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

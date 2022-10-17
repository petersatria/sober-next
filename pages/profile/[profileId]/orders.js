import Layout from '../../../components/profile/tes/layout'
import ProfileSidebar from '../../../components/profile/ProfileSidebar'
import OrderList from "../../../components/Order/OrderList"


export default function About() {
  return (
    <Layout>
      <ProfileSidebar active={"orders"} />
      <div className='p-4' style={{ width: "100%" }}>
        <OrderList />
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

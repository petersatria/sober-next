import Layout from '../../../component/tes/layout'
import ProfileSidebar from '../../../component/profile/ProfileSidebar'
import ProfileEdit from '../../../component/profile/ProfileEdit'
import { useRouter } from 'next/router'

export default function Contact() {
  const router = useRouter()
  return (
    <Layout>
      <ProfileSidebar active={"settings"}/>
      <div className='p-4' style={{width: "100%"}}>
        <ProfileEdit id={router.query.profileId } />
      </div>
    </Layout>
  )
}

// Contact.getLayout = function getLayout(page) {
//   return (
//     <Layout>
//       <Sidebar />
//       {page}
//     </Layout>
//   )
// }
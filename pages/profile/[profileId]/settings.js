import Layout from '../../../components/profile/tes/layout'
import ProfileSidebar from '../../../components/profile/ProfileSidebar'
import ProfileEdit from '../../../components/profile/ProfileEdit'
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
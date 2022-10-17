import Layout from '../../../components/profile/tes/layout'
import ProfileSidebar from '../../../components/profile/ProfileSidebar'
import ProfileEdit from '../../../components/profile/ProfileEdit'
import { useRouter } from 'next/router'
import Page from '../../../components/Page'

export default function Contact() {
  const router = useRouter()
  return (
    <Page title={"Account Settings - Sober"} description={"Account settings"}>
    <Layout>
      <ProfileSidebar active={"settings"}/>
      <div className='p-4' style={{width: "100%"}}>
        <ProfileEdit id={router.query.profileId } />
      </div>
    </Layout>
    </Page>
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
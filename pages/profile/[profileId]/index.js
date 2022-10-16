import Layout from '../../../components/profile/tes/layout'
import ProfileSidebar from '../../../components/profile/ProfileSidebar'
import ProfileDetail from '../../../components/profile/ProfileDetail'
import { useRouter } from 'next/router'


export default function Index() {
    const router = useRouter()
  return (
      <Layout>
          <ProfileSidebar active={"index"} />
            <div className='p-4' style={{width: "100%"}}>
              <ProfileDetail id={router.query.profileId } />
            </div>
    </Layout>
  )
}


// Index.getLayout = function getLayout(page) {
//   return (
//     <Layout>
//       <Sidebar />
//       {page}
//     </Layout>
//   )
// }
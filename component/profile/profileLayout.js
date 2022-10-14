import { ReactNode } from "react"
import ProfileHeader from "./ProfileHeader"
import ProfileSidebar from "./ProfileSidebar"

function profileLayout({children}) {
  return (
      <div>
          <ProfileSidebar/>
          {children}
      </div>
  )
}

export default profileLayout

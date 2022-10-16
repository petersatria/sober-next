import ProfileHeader from "../ProfileHeader"
import style from './layout.module.css'
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Layout({ children }) {
  const router = useRouter()
  console.log(router.pathname);
  return (
    <>
      <ProfileHeader />
      <div className="container">
        <div className={style.wrapKonten}>
        {children}
        </div>
      </div>
    </>
  )
}
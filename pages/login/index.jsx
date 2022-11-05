import BodyTagline from "../../components/login/BodyTagline";
import FormBody from "../../components/login/FormBody";
import LoaderSpinner from "../../components/GeneralUI/LoadingSpinner";
import Page from "../../components/Page";
import styles from "../../styles/login.module.css";

import { useSelector } from "react-redux";

const Login = () => {
  const { isLoading } = useSelector((state) => state.auth);
  return (
    <Page title={"Login"} description={"sober"}>
      <section className={styles.generalArea}>
        {isLoading && <LoaderSpinner />}
        <div className="container py-lg-5 py-md-4 py-3 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <BodyTagline />
            <FormBody />
          </div>
        </div>
      </section>
    </Page>
  );
};

export default Login;

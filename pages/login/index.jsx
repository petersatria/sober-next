import BodyTagline from "../../components/login/BodyTagline";
import FormBody from "../../components/login/FormBody";
import LoaderSpinner from "../../components/GeneralUI/LoadingSpinner";

import { useSelector } from "react-redux";

const Login = () => {
  const { isLoading } = useSelector((state) => state.auth);
  console.log("sdsdsddsdsdsd", isLoading);
  return (
    <div>

      <section className="general-area">
      {isLoading && <LoaderSpinner />}
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <BodyTagline />
            <FormBody />
          </div>
        </div>
      </section>
    </div>

  );
};

export default Login;

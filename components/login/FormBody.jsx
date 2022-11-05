import React, { useEffect, useState } from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import FacebookLoginButton from "./FacebookLoginButton";
import { useRouter } from "next/router";
import Link from "next/link";
import { setCookie, getCookie } from "../../moduleComponents/cookie";
import {
  notifications,
  errorNotification,
} from "../../moduleComponents/notification";
import { useDispatch } from "react-redux";
import {
  getUserData,
  isUserLoggedIn,
  isLoading,
  postUserLogin,
} from "../../redux/actions/authentication";
import styles from "../../styles/login.module.css";

const FormBody = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  // state
  const [iconPass, setIconPass] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [focus, setFocus] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(loading);
    dispatch(isLoading({ loading }));
  }, [loading]);

  // function
  const userLogin = async (e) => {
    e.preventDefault();
    console.log(loading);
    setLoading(true);
    let userLogin = await dispatch(postUserLogin({ username, password }));
    setLoading(false);
    let isNotif = await notifications(userLogin.payload);
    if (isNotif) {
      setCookie("userCookie", JSON.stringify(userLogin.payload.sendData), 1);
      dispatch(getUserData(JSON.parse(getCookie("userCookie"))));
      dispatch(isUserLoggedIn(true));
      router.push("/");
      return;
    }
    if (isNotif === undefined) {
      await errorNotification(userLogin.payload);
      return;
    }
  };

  // Function for JSX
  const passIconTrigger = () => (
    <input
      className={`${styles.input} form-control form-control-lg`}
      placeholder="Password"
      type={iconPass ? "text" : "password"}
      id="password"
      onChange={(e) => {
        setPassword(e.target.value);
      }}
      onClick={() => {
        setFocus(true);
      }}
      onBlur={() => {
        setFocus(false);
      }}
    />
  );
  const passIconImg = () => (
    <i
      className={
        iconPass
          ? `bi bi-eye-slash-fill input-group-text pb-3 ${styles.togglePassword}`
          : `bi bi-eye-fill input-group-text pb-3 ${styles.togglePassword}`
      }
      onClick={() => setIconPass(!iconPass)}
      id="togglePassword"
    ></i>
  );

  // render
  return (
    <div
      className={`col-md-6 col-sm-10 col-lg-6 col-xl-5 offset-xl-1 px-3 mt-md-4 py-3 ${styles.formArea}`}
    >
      <form>
        <div
          className={`mt-sm-0 mb-sm-1 ${styles.divider} d-flex align-items-center`}
        >
          <span
            className={`mx-3 text-center text-dark fw-bold ${styles.textDivider}`}
          >
            Sign in
          </span>
        </div>
        {/* <!-- Username input --> */}
        <div className="form-outline mt-3">
          <input
            placeholder="Username"
            type="text"
            id="form1Example13"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className={`form-control form-control-lg ${styles.input}`}
          />
          <label
            className={`form-label ms-3 mt-1 ${styles.label} ${styles.formLabel}`}
            htmlFor="form1Example13"
          >
            Username
          </label>
        </div>
        {/* <!-- Password input --> */}
        <div className="form-outline mt-sm-3">
          <div className="input-group">
            {passIconTrigger()}
            {passIconImg()}
          </div>
          <label
            className={`form-label ms-3 ${styles.label} ${styles.formLabel}`}
            htmlFor="form1Example23"
            style={
              focus
                ? {
                    fontSize: "0.8rem",
                    marginTop: "4px",
                    transform: "translateY(0.1rem)",
                    opacity: "1",
                    visibility: "visible",
                  }
                : { fontSize: "0.8rem", marginTop: "4px" }
            }
          >
            Password
          </label>
        </div>
        <div className="d-flex justify-content-end mb-3 me-3">
          {/* <!-- Checkbox --> */}
          <Link href={"/forgot-password"}>
            <span className={styles.forgotPassword}>Forgot Password ?</span>
          </Link>
        </div>
        {/* <!-- Submit button --> */}
        <button
          type="submit"
          className={`btn btn-primary btn-md ${styles.btnSubmit}`}
          onClick={userLogin}
        >
          Sign in
        </button>
        <div className={`${styles.divider} d-flex align-items-center my-3`}>
          <span
            className={`text-center fw-bold mx-3 mb-0 ${styles.textDivider}`}
          >
            OR
          </span>
        </div>
        <GoogleLoginButton />
        <FacebookLoginButton />
        <div className="text-center mt-3">
          <span className={`me-2 ${styles.isHaveAccountText}`}>
            Don&apos;t have an account yet ?
          </span>
          <Link href={"/signup"}>
            <span className={styles.registerText}>Register</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default FormBody;

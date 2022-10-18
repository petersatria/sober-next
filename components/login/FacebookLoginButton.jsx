import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { setCookie, getCookie } from "../../moduleComponents/cookie";
import { errorNotification, notificationSocialLogin } from "../../moduleComponents/notification";
import FacebookLogin from "react-facebook-login";
import { useDispatch } from "react-redux";
import { getUserData, isUserLoggedIn, isLoading } from "../../redux/actions/authentication";

const FacebookLoginButton = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const axios = require("axios").default;

  const [facebookUsername, setFacebookUsername] = useState("");
  const [facebookPassword, setFacebookPassword] = useState("");
  const [facebookEmail, setFacebookEmail] = useState("");
  const [facebookRole, setFacebookRole] = useState("");
  const [loading, setLoading] = useState(false);

  const responseFacebook = (response) => {
    setLoading(true)
    setFacebookUsername(response.first_name);
    setFacebookEmail(response.email);
    setFacebookPassword(response.name);
    setFacebookRole("user");
  };

  const userLogin = async () => {
    setLoading(true);
    const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}socialLogin`, {
      email: facebookEmail,
      password: facebookPassword,
    });
    setLoading(false);
    let isNotif = await notificationSocialLogin(response);
    if (isNotif) {
      setCookie(`userCookie`, JSON.stringify(response.data.sendData), 1);
      dispatch(getUserData(JSON.parse(getCookie("userCookie"))));
      dispatch(isUserLoggedIn(true))
      router.push("/");
      return;
    }
  }

  const userAutoRegister = async () => {
    try {
      setLoading(true);
      const responseRegister = await axios.post(`${process.env.NEXT_PUBLIC_URL}api/user/signup`, {
        username: facebookUsername,
        email: facebookEmail,
        name: facebookUsername,
        password: facebookPassword,
      });
      if (responseRegister.data.status === "success") {
        try {
          await userLogin()
        } catch (error) {
          console.log(error);
          errorNotification();
        }
      }
    } catch (error) {
      if (error.response) {
        notificationSocialLogin(error.response);
        return;
      }
      console.log(error);
      errorNotification();
    }
  }

  // useEffect
  useEffect(() => {
    console.log(loading)
    dispatch(isLoading({ loading }));
  }, [loading])

  useEffect(() => {
    const userFacebook = async () => {
      try {
        await userLogin()
      } catch (error) {
        if (error.response) {
          await userAutoRegister()
          return;
        }
        console.log(error);
        errorNotification();
      }
    };
    if (facebookEmail && facebookPassword !== "") {
      userFacebook();
    }
  }, [facebookEmail, facebookPassword]);
  return (
    <FacebookLogin
      appId="493278945653702"
      fields="name,email,picture,first_name"
      cssClass="btnFacebook"
      autoLoad={false}
      callback={responseFacebook}
      icon={<i className="bi bi-facebook" style={{ marginRight: "7px", fontSize: "1.1rem" }}></i>}
    />
  );
};

export default FacebookLoginButton;

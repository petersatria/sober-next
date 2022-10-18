import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { setCookie, getCookie } from "../../moduleComponents/cookie";
import { errorNotification, notificationSocialLogin } from "../../moduleComponents/notification";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { getUserData, isUserLoggedIn, isLoading } from "../../redux/actions/authentication";

const GoogleLoginButton = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const axios = require("axios").default;

  const [googleUsername, setGoogleUsername] = useState("");
  const [googleEmail, setGoogleEmail] = useState("");
  const [googlePassword, setGooglePassword] = useState("");
  const [googleRole, setGoogleRole] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCallbackResponse = async (response) => {
    let userDecode = jwt_decode(response.credential);
    setGoogleUsername(userDecode.given_name);
    setGoogleEmail(userDecode.email);
    setGooglePassword(userDecode.given_name);
    setGoogleRole("user");
  };

  const userLogin = async () => {
    setLoading(true);
    const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}socialLogin`, {
      email: googleEmail,
      password: googlePassword,
    });
    setLoading(false);
    let isNotif = await notificationSocialLogin(response);
    if (isNotif) {
      setCookie(`userCookie`, JSON.stringify(response.data.sendData), 1);
      dispatch(getUserData(JSON.parse(getCookie("userCookie"))));
      dispatch(isUserLoggedIn(true));
      router.push("/");
      return;
    }
  };

  const userAutoRegister = async () => {
    try {
      setLoading(true);
      const responseRegister = await axios.post(`${process.env.NEXT_PUBLIC_URL}api/user/signup`, {
        username: googleUsername,
        email: googleEmail,
        password: googlePassword,
        name: googleUsername,
      });
      if (responseRegister.data.status === "success") {
        try {
          await userLogin();
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
    return;
  };

  // useEffect
  useEffect(() => {
    console.log(loading);
    dispatch(isLoading({ loading }));
  }, [loading]);

  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id: "723325124358-7idukikel5vlp0logd8crflsclqlfcs4.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("google-btn"), { theme: "outline", size: "large" });
  }, []);

  useEffect(() => {
    const userGoogle = async () => {
      try {
        await userLogin();
      } catch (error) {
        if (error.response) {
          console.log('lllllllllllllllllllllllll')
          await userAutoRegister();
          return
        }
        console.log(error);
        errorNotification();
      }
    };
    if (googleEmail && googlePassword !== "") {
      userGoogle();
    }
    console.log(googleEmail);
  }, [googleEmail, googlePassword, googleUsername]);

  return <div id="google-btn" className="mb-2"></div>;
};

export default GoogleLoginButton;

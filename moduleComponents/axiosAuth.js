import { token } from "./tokenAuthorization"
import axios from "axios";

const userToken = token();
const url = 'http://localhost:5000/'

  const authAxios = axios.create({
    baseURL: url,
    headers: {
      Authorization: `Bearer ${userToken}`
    }
  })

export {authAxios}


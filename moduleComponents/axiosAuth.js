import { token } from "./tokenAuthorization"
import axios from "axios";

const userToken = token();
const url = `${process.env.NEXT_PUBLIC_URL}`

const authAxios = axios.create({
  baseURL: url,
  headers: {
    Authorization: `Bearer ${userToken}`
  }
})

export { authAxios }


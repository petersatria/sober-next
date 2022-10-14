import useSWR from 'swr'
import axios, { Axios } from "axios"


async function getData(id) {
    try {
        const data = await axios.get(`http://localhost:5000/api/profile/${id.id}`);
        return data
        
    } catch (error) {
        return error
    }
}


export default getData 
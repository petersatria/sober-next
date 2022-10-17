import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import Placeholder from 'react-bootstrap/Placeholder';
import useSWR from 'swr'
import axios from "axios"
import style from './ProfileDetail.module.css'
import { getCookie } from "../../moduleComponents/cookie";
import { token } from "../../moduleComponents/tokenAuthorization"



function ProfileDetail(id) {
  const tokenAuth = token()
  const config = {
    headers: {
      'Authorization': `Bearer ${tokenAuth}`
    }
  }
  const fetcher = url => axios.get(url, config).then((res) => res.data);
  console.log(tokenAuth);
  const { data, error } = useSWR(`http://localhost:5000/api/profile/${id.id}`, fetcher)

  const [userData, setUserData] = useState({});

  const [isLoading, setIsLoading] = useState(true)
  const splitBirtdate = userData.birthdate ? userData.birthdate.split("T") : ""
  const birthdate = splitBirtdate[0]

  useEffect(() => {
    if (data) {
      setUserData(data.data)
      setIsLoading(false)

    } else if (error) {
      setIsLoading(true)
    }
  }, [data])


  const Getdata = async (idUser) => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/profile/' + idUser)
      setInterval(() => {
        setUserData(data.data)
        setIsLoading(false)
      }, 300);

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='row'>
      <div className="col-xl-12 order-xl-1">
        <div className="card bg-light  border-0">
          <div className="card-header bg-white border-0">
            <div className="row align-items-center">
              <div className="col-8">
                <h2 className="mb-0">Account Details </h2>
              </div>
            </div>
          </div>
          <div className={`card-body bg-white ${style.contentWrapper}`}>
            <h4 className="mt-3">User Information</h4>
            <hr />
            {isLoading ?
              <Placeholder as={"div"} animation="glow">
                <Placeholder xs={9} style={{ width: '50%' }} />
              </Placeholder> :
              <div className="row">
                <div className="col-3"><h5>Name</h5></div>
                <div className="col-6"><h5>: {userData.name}</h5></div>
              </div>}
            <hr />
            {isLoading ?
              <Placeholder as={"div"} animation="glow">
                <Placeholder xs={9} style={{ width: '50%' }} />
              </Placeholder> :
              <div className="row">
                <div className="col-3"><h5>Username</h5></div>
                <div className="col-6"><h5>: {userData.username} </h5>  </div>
              </div>}
            <hr />
            {isLoading ?
              <Placeholder as={"div"} animation="glow">
                <Placeholder xs={9} style={{ width: '50%' }} />
              </Placeholder> :
              <div className="row">
                <div className="col-3"><h5>Email</h5></div>
                <div className="col-6"><h5>: {userData.email}</h5></div>
              </div>}

            <hr />
            {isLoading ?
              <Placeholder as={"div"} animation="glow">
                <Placeholder xs={9} style={{ width: '50%' }} />
              </Placeholder> :
              <div className="row">
                <div className="col-3"><h5>Birth Date</h5></div>
                <div className="col-6"><h5>: {birthdate}</h5></div>
              </div>}


          </div>
        </div>

      </div>

    </div>
  )
}

export default ProfileDetail
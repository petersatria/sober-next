import React, { useEffect } from 'react'
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import style from './ProfileEdit.module.css'
import axios, { Axios } from "axios"
import { token } from '../../moduleComponents/tokenAuthorization';


function ProfileEdit(id) {
  const [username, setUsername] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [birthdate, setBirthdate] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [cPassword, setCPassword] = useState("")
  const [isMatch, setIsMatch] = useState(false)
  const [notif, setNotif] = useState(false)
  const [pwNotif, setPwNotif] = useState(false)
  const [wrongPw, setWrongPw] = useState(false)
  const tokenAuth = token()
  const objectData = { username: username, email: email, name: name, birthdate: birthdate }
  const config = {
    headers: {
      'Authorization': `Bearer ${tokenAuth}`
    }
  }
  // const data = { username, name, email, birthdate }
  // console.log(userData);
  useEffect(() => {
    fetchdata(id.id)
  }, [id])

  const fetchdata = async (id) => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL}api/profile/${id}`, config);
      setName(data.data.name)
      setUsername(data.data.username)
      setEmail(data.data.email)
      if (data.data.birthdate !== "") {
        const split = data.data.birthdate.split("T")
        setBirthdate(split[0])
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}api/profile/update/${id.id}`, objectData, config)
      console.log(response)
      setNotif(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handlePassword = async (e) => {
    e.preventDefault()
    if (newPassword !== cPassword) {
      setIsMatch(true)
    } else {
      setIsMatch(false)
      try {
        const datapw = { oldPassword: oldPassword, newPassword: newPassword }
        const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}api/profile/settings/${id.id}`, datapw, config)
        if (response.data.message === "successfully change password") {
          setPwNotif(true)
          setWrongPw(false)
        }
      } catch (error) {
        console.log(error)
        if (error.response.data.message === "Wrong old Password") {
          setWrongPw(true)
          setPwNotif(false)
        }

      }
    }
  }

  return (
    <div className='row'>
      <div className='col-xl-12 order-xl-1'>
        <div className="card bg-light  border-0">
          <div className="card-header bg-white border-0">
            <div className="row align-items-center">
              <div className="col-8">
                <h3 className="mb-0">Account Settings</h3>
              </div>
            </div>
          </div>
          <div className='card-body bg-white'>
            <h4 className={style.heading}>Edit Profile</h4>
            <hr />
            <div className='row'>
              {notif ?
                <Alert variant='dark' onClose={() => setNotif(false)} dismissible>success update profile</Alert> : ""

              }
              <form className={style.formEdit}>
                <div className='row'>
                  <div className='col-6 p-2'>
                    <label>Username</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      // placeholder={userData.username}
                      defaultValue={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }} />
                  </div>
                  <div className='col-6 p-2'>
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      // placeholder={userData.name}
                      defaultValue={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }} />
                  </div>
                  <div className='col-6 p-2'>
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder={"exaple@gmail.com"}
                      defaultValue={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div className='col-6 p-2'>
                    <label>Birthdate</label>
                    <input type="date"
                      className="form-control form-control-lg"
                      // placeholder={userData.birthdate}
                      defaultValue={birthdate}
                      onChange={(e) => {
                        setBirthdate(e.target.value);
                      }} />
                  </div>
                  <div className='col-12 p-2'>
                    <button onClick={handleSubmit} className='btn btn-dark' style={{ width: "20%", height: "2.2rem" }}>Update Profile</button>
                  </div>
                </div>
              </form>
              <div className='col-6'>
              </div>
            </div>
            <hr />
            <div className='row'>
              <h4 className={style.heading}>Change Password</h4>
              {
                pwNotif ? <Alert variant='dark' onClose={() => setPwNotif(false)} dismissible>successfully change password</Alert> : ""
              }
              {
                wrongPw ? <Alert variant='dark'>!Wrong Password</Alert> : ""
              }
              <form className={style.formEdit}>
                <div className='col-12 p-2'>
                  <label>Old Password</label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder='*************'
                    onChange={(e) => {
                      setOldPassword(e.target.value)
                    }} />
                </div>
                <div className='col-12 p-2'>
                  <label>New Password</label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder='*************'
                    onChange={(e) => {
                      setNewPassword(e.target.value)
                    }} />
                </div>
                <div className='col-12 p-2'>
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder='*************'
                    onChange={(e) => {
                      setCPassword(e.target.value)
                    }} />
                  {isMatch ? <span style={{ color: "red" }}> !Passwords did not match </span> : ""}
                </div>
                <div className='col-12 p-2'>
                  <button onClick={handlePassword} className='btn btn-dark' style={{ width: "20%" }}>Change Password</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileEdit
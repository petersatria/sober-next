import React from 'react'

import style from './ProfileHeaders.module.css'

function ProfileHeader() {
  return (
    <div className={style.headers}>
      <div className='container'>
        <div className={style.headersWrap}>
            <div className={style.headerText}>My Account</div>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader
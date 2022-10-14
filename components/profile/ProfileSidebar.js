import React, { useState } from 'react'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faBagShopping,faRightFromBracket, faUserPen } from '@fortawesome/free-solid-svg-icons';
import style from './ProfileSidebar.module.css'
import Link from 'next/link'
function ProfileSidebar(active) {
  const router = useRouter()
  
  const route = {
    index: `/profile/${router.query.profileId}`,
    settings: `/profile/${router.query.profileId}/settings`,
    orders: `/profile/${router.query.profileId}/orders`
  }

  return (
      <ul className={style.list}>
      <li>
        <Link href={route.index}>
          <a className={`${style.linkk} ${active.active == "index" ? style.active : ""}`}>
            <FontAwesomeIcon icon={faUser} /><span className='ms-4'>Account Details</span>
          </a>
        </Link>
      </li>
      <li>
        <Link href={route.settings}>
          <a className={`${style.linkk} ${active.active == "settings" ? style.active : ""}`} >
            <FontAwesomeIcon icon={faUserPen} /><span className='ms-3'>Account Settings</span>
          </a>
        </Link>
      </li>
      <li>
        <Link href={route.orders}>
          <a className={`${style.linkk} ${active.active == "orders" ? style.active : ""}`}>
            <FontAwesomeIcon icon={faBagShopping} /><span className='ms-4'>Order</span>
          </a>
        </Link>
      </li>
      
      </ul>
  )
}

export default ProfileSidebar
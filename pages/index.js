import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      Hello Home
      <Link href="/cart"><button>Go to cart</button></Link>
      <Link href="/cart/96"><button>Go to cart with id</button></Link>
    </div>
  )
}

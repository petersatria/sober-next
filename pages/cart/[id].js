import { useRouter } from 'next/router'

export default function CartWithId() {
    const router = useRouter()

    console.log(router.query)
    return (
      <div>
          <span>hello cart { router.query.id }</span>
      </div>
    )
  }
  
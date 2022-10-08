import { useSelector } from 'react-redux'

export default function Cart() {
    const cart = useSelector(state=>state)
  return (
    <div>
        <span>hello cart</span>
    </div>
  )
}

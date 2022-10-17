import { useEffect, useState } from "react"
import axios from "axios";
import styles from '../../styles/order.module.css'
import { useRouter } from 'next/router'
import Order from './Order';
// import { authAxios } from "../../../moduleComponents/axiosAuth";

const OrderList = () => {

	const [orders, setOrders] = useState([{}])

	const [zero, setZero] = useState(true)

	const router = useRouter()

	const getOrders = async () => {
		try {
			const { data } = await axios.get(`http://localhost:5000/transactionHistoryDetail/${router.query.userId}`)
			console.log(data)

			// console.log('from list', data.result)
			setZero(false)
			setOrders(data.result)

		} catch (error) {
			console.log(error)
			// window.location.assign('/not-found-page')
		}
	}

	useEffect(() => {
		getOrders()
	}, [])

	return (
		<div className="container">
			<div className={`my-5 ${styles.wrapperList}`}>
				<h1 className={styles.orderTitle}>Transaction List</h1>
				{zero ? <h2 className="text-center">No transaction yet, buy some products first!</h2> : ''}
				{orders && orders.map(order => {
					return order.products?.map((product) => {
						return order.order?.map((orderTrans) => {
							return (
								<Order key={Math.random()} product={product} productTrans={order} order={orderTrans} />
							)
						})
					})
				})}

			</div>
		</div >
	)
}

export default OrderList
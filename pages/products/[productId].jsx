import { useEffect, useState } from "react"
import Link from 'next/link'
import Product from "../../components/Product";
import BreadCumb from "../../components/BreadCumb";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import styles from '../../styles/Product.module.css'
import { useDispatch } from 'react-redux'
import Page from "../../components/Page";
import Image from 'next/future/image'
import { settings, settingsRelated } from "../../components/Slider";
import { addToCart } from '../../redux/actions/cartSlicer'
import { useRouter } from 'next/router'
const ProductDetail = (props) => {
	const [items, setItems] = useState(1);
	const [relatedProducts, setRelatedProducts] = useState('')
	const [sizeItem, setSizeItem] = useState('')

	const router = useRouter()
	const dispatch = useDispatch()
	const { productId } = router.query
	const { product, products } = props


	// console.log('testss', Object.keys(product.size[0]))
	// console.log('testss', product)

	const relatedCategory = () => {
		const p = products.map((pr) => {
			return pr
		})

		return p.filter(
			p => p?.category === product?.category && p._id !== product._id
		)
	}

	const itemsHandler = e => {
		// if (e.target.value > 10) {
		// 	setItems(10)
		// } else if (e.target.value < 1) {
		// 	setItems(1)
		// } else {
		// 	setItems(e.target.value)
		// }
		const size = e.target.value
		setSizeItem(size)
	}

	const addToCartHandler = async () => {
		// await axios.post('http://localhost:5000/cart', { productId: id, quantity: items })


		dispatch(addToCart({ productId: productId, quantity: items, size: sizeItem }))
	}

	const shuffled = () => {
		if (relatedCategory(products).length > 3) {
			setRelatedProducts(relatedCategory(products).sort(() => 0.5 - Math.random()))
		} else {
			setRelatedProducts(products.filter(p => p._id !== product._id).sort(() => 0.5 - Math.random()))
		}
	}

	// console.log(fix)

	useEffect(() => {
		shuffled()
	}, [product])

	const price = product.price.toLocaleString('id-ID', {
		style: 'currency',
		currency: 'IDR',
	});


	return (
		<Page title={product?.name} description={product?.summary}>
			<div className="container">
				<BreadCumb linkTo={product} />
				<div className="row text-center my-5">
					<div className="col-12 col-md-6 align-self-center">
						<Slider {...settings}>
							{product.images && product.images.map((img) => (
								<div key={img}>
									<Image quality={30} width={500} height={500} placeholder="blur" blurDataURL={img} className={styles.productDetailImg} src={img} alt="" />
								</div>
							))}
						</Slider>
					</div>
					<div className={`col-12 col-md-6 my-5 align-self-center`}>
						<h1 className={styles.nameProduct}>{product.name}</h1>
						<p className={`mt-5 mt-md-3 mt-lg-5 ${styles.descProduct}`}>
							{product.summary}
						</p>
						<p className={` mt-5 mt-md-3 mt-lg-5 ${styles.priceProduct}`}>{price}</p>
						<div className="row justify-content-center">
							<div className="col-4 mt-5 mt-md-3 mt-lg-5">
								{/* <input className={`${styles.fullWidth} ${styles.inputNum}`} type="number" name="quantity" id="quantity" min={1} max={10} onChange={itemsHandler} value={items} /> */}
								<div className="dropdown">
									<button className={`btn dropdown-toggle ${styles.fullWidth}`} style={{ fontSize: "14px", padding: "10px", border: "1px solid " }} type="button" data-bs-toggle="dropdown" aria-expanded="false">
										{sizeItem ? sizeItem : 'Select Size'}
									</button>
									<ul className="dropdown-menu">
										{product.size && Object.keys(product.size[0]).map((sizes) => {
											return <option key={sizes} onClick={itemsHandler} className="dropdown-item" type="button">{sizes.toUpperCase()}</option>
										})}
									</ul>
								</div >
							</div >
							<div className="col-4 mt-5 mt-md-3 mt-lg-5">
								{/* <Link href='/cart'> */}
								<div className={`btn btn-dark ${styles.fullWidth}`} onClick={addToCartHandler} style={{ fontSize: "14px", padding: "10px" }}>Add to cart</div>
								{/* onClick={addToCartHandler} */}
								{/* </Link> */}
							</div>
						</div >
						<div className={`mt-5 mt-md-3 mt-lg-5 align-items-end ${styles.border}`}>
							{product.category &&
								<p className={`my-5 my-md-3 my-lg-5 ${styles.catProduct}`}>CATEGORY: {product.category.toUpperCase()}</p>
							}
						</div>
					</div >
				</div >
				<div className={` row text-center my-md-5 `}>
					<div className={`mt-md-5 ${styles.borderTop}`}>
						<h2 className={`mt-5 ${styles.relatedProductTitle}`}>Detail Product</h2>
						<p className={`mt-5 ${styles.descProduct}`}>{product.detail}</p>
					</div>
				</div>
				<div className={` row text-center my-md-5 `}>
					<div className="col-12 mt-md-5">
						<div className={`mt-md-5 ${styles.border}`}>
							<h2 className={`mt-5 ${styles.relatedProductTitle}`}>Related Products</h2>
							<Slider {...settingsRelated}>
								{relatedProducts && relatedProducts.slice(0, 4).map(product => (
									<div key={Math.random().toString() + product._id} className="mt-5 p-3">
										<Product product={product} />
									</div>
								))}
							</Slider>
						</div>
					</div>
				</div>
			</div >
		</Page>
	)
}

export default ProductDetail

export async function getServerSideProps(context) {

	try {
		const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL}api/product/${context.params.productId}`)

		const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}api/product`)
		const datas = res.data

		// console.log(data.product)

		return {
			props: {
				product: data.product,
				products: datas.result

			}, // will be passed to the page component as props
		}
	} catch (error) {
		return {
			props: {
				product: [],
				products: []

			}, // will be passed to the page component as props
		}
	}


}
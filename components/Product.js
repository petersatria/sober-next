import styles from '../styles/Product.module.css'
import Link from 'next/link'
import Image from 'next/future/image'

const Product = (props) => {
	const { product, isLoading } = props
	// console.log('hee', props.product)

	const price = product.price.toLocaleString('id-ID', {
		style: 'currency',
		currency: 'IDR',
	});

	const css = { width: '100px', height: '100px' }


	return (
		<>
			<div className="col mb-5">
				<div className={`card h-100 border-0 ${styles.wrapperProduct}`}>
					<Link href={`/products/${product._id}`} >
						<div className={`card-img-top`} >
							<div>
								<Image quality={30} width={500} height={500} placeholder="blur" blurDataURL={"base64"} className={` ${styles.productImg}`} src={product.images[0]} alt="" />
								<Image quality={30} width={500} height={500} placeholder="blur" blurDataURL={"base64"} className={` ${styles.productHover}`} src={product.images[1]} alt="" />
							</div>

						</div>
					</Link>
					<div className={`card-body ${styles.productDesc}`} >
						<p className={` ${styles.listProductFont}`}>{product.name}</p>
						<p className={` ${styles.listProductFont}`}>{price}</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default Product
import Product from "../../components/Product"
import BreadCumb from "../../components/BreadCumb";
import axios from "axios";
import Page from "../../components/Page";
import Pagination from "../../components/Pagination/Pagination";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { headerActions } from '../../redux/actions/headerSlicer';

const ProductList = (props) => {

    // Set header active
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(headerActions.setActive(router.pathname));
    }, []);


	const products = props?.products;


	return (
		<Page title={"All Products"} description={"All Products"}>
			<div className="container">
				<BreadCumb linkTo={"All Products"} linkRef={"/products/"} />
				<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 text-center my-2">
					{products && products.map(product => (
						<Product key={Math.random().toString() + product._id} product={product} price={product.price} />
					))}
				</div>
				<Pagination props={props} />
			</div>
		</Page>
	)
}

export default ProductList


export async function getServerSideProps(context) {

	// console.log(context.query)

	try {
		// const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL}api/product`)
		const { data } = await axios.get(`http://localhost:5000/api/product?page=${context.query.page ? context.query.page : 1 }`)
		console.log('max', data.maxPage)
		return {
			props: {
				products: data.result,
				maxPage: data.maxPage
			}, // will be passed to the page component as props
		}
	} catch (error) {
		return {
			props: {
				products: [],
			}, // will be passed to the page component as props
		}
	}
}

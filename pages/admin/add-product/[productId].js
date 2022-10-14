import { useRouter } from 'next/router';
import axios from 'axios';

import UpdateProduct from '../../../components/Admin/UpdateProduct';

const UpdateProductPage = ({ product }) => {
    const router = useRouter();

    const { productId } = router.query;

    return <UpdateProduct items={product} id={productId} />;
};

export async function getServerSideProps({ params }) {
    const host =
        process.env.NODE_ENV === 'development'
            ? process.env.DEV_URL
            : process.env.REACT_APP_URL;

    const res = await axios.get(`${host}api/product/${params.productId}`);
    const product = res.data.product;
    return {
        props: {
            product,
        },
    };
}

export default UpdateProductPage;

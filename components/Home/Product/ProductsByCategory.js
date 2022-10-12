import { useEffect, useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';

import ProductList from './ProductList';
import ProductsHeader from './ProductsHeader';

import styles from './Products.module.css';

const ProductsByCategory = ({ items, image, heading, category }) => {
    // State
    const [showAllProducts, setShowAllProducts] = useState(false);
    const [products, setProducts] = useState([]);

    // SWR | Fetching data
    const host =
        process.env.NODE_ENV === 'development'
            ? process.env.DEV_URL
            : process.env.REACT_APP_URL;

    const fetcher = (url) =>
        axios
            .get(url)
            .then((res) => res.data.result)
            .filter((product) => product.category === category);

    const { data } = useSWR(`${host}api/productCategory`, fetcher);

    // Side Effect
    useEffect(() => {
        if (!data) return setProducts(items);
        setProducts(data);
    }, [data]);

    // Handler
    const clickHandler = () => {
        setShowAllProducts((prevState) => !prevState);
    };

    // Component
    const firstFiveProducts = products
        .slice(0, 5)
        .map((product) => (
            <ProductList
                key={product._id}
                img={product.images}
                name={product.name}
                price={product.price}
                hot={product.recommendation}
                product={product}
            />
        ));

    const allProducts = products.map((product) => (
        <ProductList
            key={product._id}
            img={product.images}
            name={product.name}
            price={product.price}
            hot={product.recommendation}
            product={product}
        />
    ));

    return (
        <>
            <ProductsHeader image={image} heading={heading} />

            <section className={styles.container}>
                <div className={styles.list}>
                    {showAllProducts ? allProducts : firstFiveProducts}
                </div>

                <button onClick={clickHandler} className={styles.btn}>
                    {showAllProducts ? 'Show Less' : 'Show More'}
                </button>
            </section>
        </>
    );
};

export default ProductsByCategory;

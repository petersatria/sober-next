import { useEffect, useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';

import ProductList from './ProductList';
import ProductsHeader from './ProductsHeader';

import styles from './Products.module.css';

const host =
    process.env.NODE_ENV === 'development'
        ? process.env.DEV_URL
        : process.env.REACT_APP_URL;

const fetcher = (url) =>
    axios
        .get(url)
        .then((res) =>
            res.data.data.filter((products) => products?.recommendation).slice(0, 5)
        )
        .catch((err) => []);

const ProductsBestWeek = ({ items }) => {
    // State
    const [products, setProducts] = useState([]);

    const { data } = useSWR(`${host}api/product`, fetcher);

    // Side Effect
    useEffect(() => {
        setProducts(items);

        if (data) {
            setProducts(data);
        }
    }, [data]);

    return (
        <>
            <ProductsHeader
                image="Products-Header-Bestseller.jpg"
                heading="Best of This Week"
            />

            <section className={styles.container}>
                <div className={styles.list}>
                    {products.map((product) => (
                        <ProductList
                            key={product._id}
                            img={product.images}
                            name={product.name}
                            price={product.price}
                            hot={product.recommendation}
                            product={product}
                        />
                    ))}
                </div>
            </section>
        </>
    );
};

export default ProductsBestWeek;

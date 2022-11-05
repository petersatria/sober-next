import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

import ProductList from './ProductList';
import ProductsHeader from './ProductsHeader';

import styles from './Products.module.css';

const host =
    process.env.NODE_ENV === 'development'
        ? process.env.DEV_URL
        : process.env.REACT_APP_URL;

const ProductsByCategory = ({ items, image, heading, category }) => {
    // State
    const [products, setProducts] = useState(items);

    // Side Effect
    useEffect(() => {
        (async () => {
            try {
                const res = await axios.post(`${host}api/productCategory`, { category });
                setProducts(res.data.result);
            } catch (err) {
                console.log('not found');
            }
        })();
    }, []);

    return (
        <>
            <ProductsHeader image={image} heading={heading} />

            <section className={styles.container}>
                <div className={styles.list}>
                    {products.slice(0, 10).map((product) => (
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

                <Link href="/products">
                    <a className={styles.btn}>Show All</a>
                </Link>
            </section>
        </>
    );
};

export default ProductsByCategory;

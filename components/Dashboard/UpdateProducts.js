import { useState } from 'react';
import FormProduct from './FormProduct';
import styles from './FormProduct.module.css';

// Host
const host =
    process.env.NODE_ENV === 'development'
        ? process.env.DEV_URL
        : process.env.REACT_APP_URL;

function UpdateProducts({ products }) {
    const [product, setProduct] = useState(products[0]);

    // Handler
    const changeHandler = (e) => {
        const searchedProduct = products.find(
            (product) => product._id === e.target.value
        );
        setProduct(searchedProduct);
    };

    // Component
    const option = products.map((product) => (
        <option key={product._id} value={product._id}>
            {product.name}
        </option>
    ));
    return (
        <>
            <div className={styles.control}>
                <label className={styles.label} htmlFor="size">
                    Choose Product To Update
                </label>
                <select onChange={changeHandler} className={styles.input}>
                    {option}
                </select>
            </div>

            {product && (
                <FormProduct
                    header={`Update ${product.name}`}
                    product={product}
                    method="PATCH"
                    url={`${host}api/edit-data/${product._id}`}
                    type="update"
                />
            )}
        </>
    );
}

export default UpdateProducts;

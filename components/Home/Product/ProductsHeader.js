import Image from 'next/future/image';
import styles from './ProductsHeader.module.css';

const ProductsHeader = ({ image, heading }) => {
    return (
        <div className={styles.container}>
            <Image
                className={styles.image}
                src={`/images/products/headers/${image}`}
                alt="Bestseller product"
                width={1600}
                height={150}
            />
            <h2 className={styles.heading}>{heading}</h2>
        </div>
    );
};

export default ProductsHeader;

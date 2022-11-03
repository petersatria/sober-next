import Image from 'next/future/image';
import styles from './ProductsHeader.module.css';

const ProductsHeader = ({ heading }) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>{heading}</h2>
        </div>
    );
};

export default ProductsHeader;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

import styles from './ProductList.module.css';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/future/image';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/actions/cartSlicer';
// import { addCart } from '../../store/actions/CartAction';
import ProductModal from './ProductModal';

const ProductList = (props) => {
    const dispatch = useDispatch();
    // State
    const [modalActive, setModalActive] = useState(false);
    const { product } = props;

    // Handler
    const showModalHandler = () => {
        setModalActive(true);
    };


    const modalSubmitHandler = (value) => {
        dispatch(addToCart({ productId: product._id, quantity: 1, size: value.toUpperCase() }));
        // console.log({ productId: product._id, quantity: 1, size: value })
    };

    // Props
    const price = props.price?.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
    });

    return (
        <>
            {modalActive && (
                <ProductModal
                    image={props.img[1]}
                    name={props.name}
                    onClose={() => setModalActive(false)}
                    onSubmit={modalSubmitHandler}
                    size={product.size}
                />
            )}

            <div className={styles.container}>
                <span className={styles['link-wrapper']}>
                    <Link href={`/products/${product._id}`}>
                        <a
                            onClick={() => {
                                window.scrollTo(0, 0);
                            }}
                        >
                            <div className={styles.link}>
                                {props.img.length > 1 ? (
                                    <>
                                        <Image
                                            src={props.img[0]}
                                            alt="Product"
                                            className={styles.img}
                                            width={300}
                                            height={420}
                                            layout="responsive"
                                        />
                                        <Image
                                            src={props.img[1]}
                                            alt="Product"
                                            className={`${styles.img} ${styles['img--2']}`}
                                            width={300}
                                            height={420}
                                            layout="responsive"
                                        />
                                    </>
                                ) : (
                                    <Image
                                        src={props.img[0]}
                                        alt="Product"
                                        className={styles.img}
                                        width={300}
                                        height={420}
                                        layout="responsive"
                                    />
                                )}
                            </div>
                        </a>
                    </Link>
                </span>

                <button onClick={showModalHandler} className={styles.btn}>
                    <FontAwesomeIcon icon={faCartShopping} />
                </button>

                <div className={styles.text}>
                    <p className={styles.name}>{props.name}</p>

                    <p className={styles.price}>{price}</p>
                </div>

                <div className={styles.tags}>
                    {props.hot && <div className={styles.hot}>Hot</div>}
                    {/* <div className={styles.new}>New</div> */}
                    {/* <div className={styles.discount}>20%</div> */}
                </div>
            </div>
        </>
    );
};

export default ProductList;

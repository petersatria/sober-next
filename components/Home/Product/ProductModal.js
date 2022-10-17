import { useRef, useState } from 'react';
import Image from 'next/future/image';
import Overlay from '../../GeneralUI/Overlay';
import styles from './ProductModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const ProductModal = ({ image, name, onClose, onSubmit, size }) => {
    const selectRef = useRef();
    const [imageLoad, setImageLoad] = useState(true);

    const submitHandler = (e) => {
        e.preventDefault();

        onSubmit(selectRef.current.value);
        onClose();
    };

    const loadHandler = (e) => {
        setImageLoad(false);
    };

    // ELEMENT
    const loadingSpinnerEl = (
        <span className={styles.loader}>
            <span className={styles.inner}></span>
        </span>
    );

    return (
        <Overlay>
            <div className={styles.container}>
                <div className={styles.image}>
                    <Image
                        onLoad={loadHandler}
                        src={image}
                        alt={name}
                        width={600}
                        height={600}
                    />
                    {imageLoad && loadingSpinnerEl}
                </div>

                <div className={styles.content}>
                    <button onClick={onClose} className={`${styles.btn} ${styles.close}`}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>

                    <div>
                        <h3 className={styles.heading}>{name}</h3>

                        <form onSubmit={submitHandler}>
                            <label className={styles.label}>Pick your size</label>

                            <div className={styles.input}>
                                <select ref={selectRef}>
                                    {size && Object.keys(size).map((sizes) => {
                                        return <option key={sizes} value={sizes} >{sizes.toUpperCase()}</option>
                                    })}
                                    {/* <option></option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option> */}
                                </select>

                                <button className={`${styles.btn} ${styles.add}`}>
                                    Add to Cart
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Overlay>
    );
};

export default ProductModal;

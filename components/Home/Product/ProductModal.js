import { useRef } from 'react';
import Image from 'next/future/image';
import Overlay from '../../GeneralUI/Overlay';
import styles from './ProductModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const ProductModal = ({ image, name, onClose, onSubmit }) => {
    const selectRef = useRef();

    const submitHandler = (e) => {
        e.preventDefault();

        onSubmit(selectRef.current.value);
        onClose();
    };

    return (
        <Overlay>
            <div className={styles.container}>
                <div className={styles.image}>
                    <Image src={image} alt={name} width={600} height={600} />
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
                                    <option></option>
                                    <option value="s">S</option>
                                    <option value="m">M</option>
                                    <option value="l">L</option>
                                    <option value="xl">XL</option>
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

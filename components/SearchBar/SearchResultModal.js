import Overlay from '../GeneralUI/Overlay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './SearchResultModal.module.css';
import ProductList from '../Home/Product/ProductList';

const SearchResultModal = ({ result, onClose }) => {
    return (
        <Overlay>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h3 className={styles.heading}>Search result:</h3>

                    <button onClick={() => onClose()} className={styles.btn}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>

                <div className={styles.result}>
                    {result.length > 0 ? (
                        result.map((product) => (
                            <ProductList
                                key={product._id}
                                img={product.images}
                                name={product.name}
                                price={product.price}
                                hot={product.recommendation}
                                product={product}
                            />
                        ))
                    ) : (
                        <p>Clothes did not exist</p>
                    )}
                </div>
            </div>
        </Overlay>
    );
};

export default SearchResultModal;

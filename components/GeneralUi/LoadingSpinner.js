import Overlay from './Overlay';

import styles from './LoadingSpinner.module.css';

const LoaderSpinner = () => {
    return (
        <Overlay>
            <div className={styles.container}>
                <p>Please wait ...</p>
                <span className={styles.loader}>
                    <span className={styles.inner}></span>
                </span>
            </div>
        </Overlay>
    );
};

export default LoaderSpinner;

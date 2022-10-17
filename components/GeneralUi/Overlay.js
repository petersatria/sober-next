import { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import styles from './Overlay.module.css';

const Overlay = ({ children }) => {
    const [doc, setDoc] = useState(null);

    useEffect(() => {
        setDoc(window.document);
    }, []);

    return doc ? (
        ReactDom.createPortal(
            <>
                <div className={styles.overlay}>{children}</div>
            </>,
            doc.getElementById('modal-root')
        )
    ) : (
        <></>
    );
};

export default Overlay;

import ReactDom from 'react-dom';
import styles from './Overlay.module.css';

const Backdrop = (props) => {
    return <div className={styles.backdrop}></div>;
};

const Modal = (props) => {
    return <div className={styles.modal}>{props.children}</div>;
};

const Overlay = (props) => {
    return ReactDom.createPortal(
        <>
            <Backdrop />
            <Modal>{props.children}</Modal>
        </>,
        document.getElementById('modal-root')
    );
};

export default Overlay;

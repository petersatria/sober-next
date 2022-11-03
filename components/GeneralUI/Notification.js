import { useState } from 'react';
import Overlay from './Overlay';
import styles from './Notification.module.css';

const Notification = ({ message, status, title }) => {
    const [show, setShow] = useState(true);

    const showHandler = () => {
        if (status === 'pending') return;

        setShow(false);
    };

    let background;

    if (status === 'success') background = styles.success;
    if (status === 'error') background = styles.error;
    if (status === 'pending') background = styles.pending;

    const notifStyle = `${styles.notif} ${background}`;

    return (
        <>
            {show && (
                <Overlay>
                    <div onClick={showHandler} className={notifStyle}>
                        <p>{title} |</p>
                        <p>{message}...</p>
                    </div>
                </Overlay>
            )}
        </>
    );
};

export default Notification;

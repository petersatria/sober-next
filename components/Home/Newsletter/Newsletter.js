import { useRef } from 'react';

import styles from './Newsletter.module.css';

const Newsletter = () => {
    const inputRef = useRef();

    const submitHandler = (e) => {
        e.preventDefault();

        console.log(inputRef.current.value);

        inputRef.current.value = '';
    };
    return (
        <section className={styles.container}>
            <h3 className={styles.heading}>Newsletter</h3>

            <p className={styles.text}>Get timely updates from your favorite products</p>

            <form onSubmit={submitHandler} className={styles.form}>
                <input
                    ref={inputRef}
                    className={styles.input}
                    type="email"
                    placeholder="Enter your email address"
                />
                <button className={styles.btn}>Subscribe</button>
            </form>
        </section>
    );
};

export default Newsletter;

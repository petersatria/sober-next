import { useRef } from 'react';
import axios from 'axios'
import styles from './Newsletter.module.css';

const Newsletter = () => {
    const inputRef = useRef();

    const submitHandler = async(e) => {
        e.preventDefault();
        const email = inputRef.current.value

        try {
            const emailResponse = await axios.post(`http://localhost:5000/newmail`,{email})
            console.log(emailResponse)
        } catch (error) {
            console.log(error)
        }


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

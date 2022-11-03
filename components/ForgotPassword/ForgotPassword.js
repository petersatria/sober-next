import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import useFetch from '../../hooks/use-fetch';

import Form from '../GeneralUI/Form';
import Input from '../GeneralUI/Input';
// import Notification from '../GeneralUI/Notification';
import { notifications } from '../../moduleComponents/notification';
import LoadingSpinner from '../GeneralUI/LoadingSpinner';

import ValidationFunction from '../../lib/ValidationFunction';

import styles from '../Signup/Signup.module.css';

const host =
    process.env.NODE_ENV === 'development'
        ? process.env.DEV_URL
        : process.env.REACT_APP_URL;

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);

    // Router
    const router = useRouter();

    // Fetch hook
    const { sendRequest, result } = useFetch();

    // Ref
    const emailInputRef = useRef();

    // Side effects
    useEffect(() => {
        if (!result) return;

        if (result === 'pending') {
            setLoading(true);
            return;
        }

        if (result === 'error') {
            (async () =>
                await notifications({
                    statusCode: 400,
                    message: 'Something went wrong',
                }))();
        }

        if (result === 'success') {
            (async () =>
                await notifications({
                    statusCode: 200,
                    message: 'Check your email',
                }))();
            setTimeout(() => {
                router.replace('/');
            }, 2200);
        }

        setLoading(false);
    }, [result, router]);

    // Handler
    const submitFormHandler = async (e) => {
        e.preventDefault();

        if (!emailInputRef.current.valueIsValid) return;

        const passwordResetInput = {
            email: emailInputRef.current.value,
        };

        sendRequest({
            method: 'PUT',
            url: `${host}forgotPasswordVerification`,
            data: passwordResetInput,
        });

        emailInputRef.current.reset();
    };

    return (
        <div className={styles.signup}>
            {loading && <LoadingSpinner />}

            <Form onSubmit={submitFormHandler}>
                <div className={styles['form-group']}>
                    <Input
                        ref={emailInputRef}
                        validation={ValidationFunction.emailValidation}
                        type="email"
                        label="Email Address"
                        errorMsg="Please input valid email"
                    />
                </div>

                <div className={styles['form-group']}>
                    <button className={styles['btn-signup']}>Send</button>
                </div>
            </Form>
        </div>
    );
};

export default ForgotPassword;

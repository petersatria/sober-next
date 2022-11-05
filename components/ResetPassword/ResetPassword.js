import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import useFetch from '../../hooks/use-fetch';

import Form from '../GeneralUI/Form';
import Input from '../GeneralUI/Input';
import { notifications } from '../../moduleComponents/notification';
import LoadingSpinner from '../GeneralUI/LoadingSpinner';

import ValidationFunction from '../../lib/ValidationFunction';

import styles from '../Signup/Signup.module.css';

const host =
    process.env.NODE_ENV === 'development'
        ? process.env.DEV_URL
        : process.env.REACT_APP_URL;

const ResetPassword = ({ token }) => {
    const [loading, setLoading] = useState(false);

    // Router
    const router = useRouter();

    // Fetch hook
    const { sendRequest, result } = useFetch();

    // Ref
    const passwordRef = useRef();

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
                    message: 'Password Updated',
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

        if (!passwordRef.current.valueIsValid) return;

        const passwordResetInput = {
            password: passwordRef.current.value,
            tokenResetPassword: token,
        };

        sendRequest({
            method: 'POST',
            url: `${host}forgotPassword`,
            data: passwordResetInput,
        });

        passwordRef.current.reset();
    };

    return (
        <div className={styles.signup}>
            {loading && <LoadingSpinner />}

            <Form onSubmit={submitFormHandler}>
                <div className={styles['form-group']}>
                    <Input
                        ref={passwordRef}
                        validation={ValidationFunction.passwordValidation}
                        type="password"
                        label="New Password"
                        errorMsg="Password must at least 7 character"
                    />
                </div>

                <div className={styles['form-group']}>
                    <button className={styles['btn-signup']}>Send</button>
                </div>
            </Form>
        </div>
    );
};

export default ResetPassword;

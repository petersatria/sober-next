import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import useFetch from '../../hooks/use-fetch';

import Form from '../GeneralUI/Form';
import Input from '../GeneralUI/Input';
// import Notification from '../GeneralUI/Notification';
import { notifications } from '../../moduleComponents/notification';
import LoadingSpinner from '../GeneralUI/LoadingSpinner';

import ValidationFunction from '../../lib/ValidationFunction';

import styles from './Signup.module.css';

const host =
    process.env.NODE_ENV === 'development'
        ? process.env.DEV_URL
        : process.env.REACT_APP_URL;

const Signup = () => {
    const [loading, setLoading] = useState(false);

    // Router
    const router = useRouter();

    // Fetch hook
    const { sendRequest, result } = useFetch();

    // Ref
    const nameInputRef = useRef();
    const usernameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const birthdateInputRef = useRef();

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
                await notifications({ statusCode: 200, message: 'Register success' }))();

            setTimeout(() => {
                router.replace('/login');
            }, 2200);
        }

        setLoading(false);
    }, [result, router]);

    // Handler
    const submitFormHandler = async (e) => {
        e.preventDefault();

        if (
            !(
                nameInputRef.current.valueIsValid &&
                usernameInputRef.current.valueIsValid &&
                emailInputRef.current.valueIsValid &&
                passwordInputRef.current.valueIsValid &&
                birthdateInputRef.current.valueIsValid
            )
        )
            return;

        const registerInput = {
            name: nameInputRef.current.value,
            username: usernameInputRef.current.value,
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value,
            birthdate: birthdateInputRef.current.value,
        };

        sendRequest({
            method: 'POST',
            url: `${host}api/user/signup`,
            data: registerInput,
        });

        nameInputRef.current.reset();
        usernameInputRef.current.reset();
        emailInputRef.current.reset();
        passwordInputRef.current.reset();
        birthdateInputRef.current.reset();
    };

    return (
        <div className={styles.signup}>
            {loading && <LoadingSpinner />}

            <Form onSubmit={submitFormHandler}>
                <div className={styles['form-group']}>
                    <Input
                        ref={nameInputRef}
                        validation={ValidationFunction.notEmptyValidation}
                        type="text"
                        label="Name"
                        errorMsg="Name must not empty"
                    />

                    <Input
                        ref={usernameInputRef}
                        validation={ValidationFunction.notEmptyValidation}
                        type="text"
                        label="Username"
                        errorMsg="Username must not empty"
                    />
                    <Input
                        ref={emailInputRef}
                        validation={ValidationFunction.emailValidation}
                        type="email"
                        label="Email Address"
                        errorMsg="Please input valid email"
                    />
                    <Input
                        ref={passwordInputRef}
                        validation={ValidationFunction.passwordValidation}
                        type="password"
                        label="Password"
                        errorMsg="Password must have at least 7 character"
                    />

                    <Input
                        ref={birthdateInputRef}
                        validation={ValidationFunction.birthdateValidation}
                        type="date"
                        label="Birtdate"
                        errorMsg="Birthdate must earlier than today"
                    />
                </div>

                <div className={styles['form-group']}>
                    <button className={styles['btn-signup']}>Sign Up</button>
                </div>
            </Form>
        </div>
    );
};

export default Signup;

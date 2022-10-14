import { useImperativeHandle, forwardRef } from 'react';

import useInput from '../../hooks/use-input';

import styles from './Input.module.css';

const Input = forwardRef((props, ref) => {
    const {
        changeHandler,
        value,
        valueIsValid,
        valueIsError,
        blurHandler,
        reset,
        stylesInput,
    } = useInput(props.validation);

    useImperativeHandle(ref, () => {
        return {
            reset,
            value,
            valueIsValid,
        };
    });

    return (
        <div className={styles['input-group']}>
            {valueIsError && <p className={styles.error}>{props.errorMsg}</p>}
            <input
                onChange={changeHandler}
                onBlur={blurHandler}
                className={stylesInput}
                type={props.type}
                placeholder={props.label}
                value={value}
            />

            <label className={styles.label}>{props.label}</label>
        </div>
    );
});

export default Input;

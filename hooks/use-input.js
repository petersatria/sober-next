import { useState } from 'react';

import styles from '../components/GeneralUI/Input.module.css';

const useInput = (validation = () => true) => {
    const [value, setValue] = useState('');
    const [isTouch, setIsTouch] = useState(false);

    const valueIsValid = validation(value);
    const valueIsError = !valueIsValid && isTouch;

    const changeHandler = (e) => {
        setValue(e.target.value);
    };

    const blurHandler = () => {
        setIsTouch(true);
    };

    const reset = () => {
        setIsTouch(false);
        setValue('');
    };

    const stylesInput = valueIsError ? `${styles.input} ${styles.invalid}` : styles.input;

    return {
        value,
        valueIsValid,
        valueIsError,
        changeHandler,
        blurHandler,
        reset,
        stylesInput,
        setValue,
    };
};

export default useInput;

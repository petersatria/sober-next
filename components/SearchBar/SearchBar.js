import { useEffect, useRef, useState } from 'react';
import useFetch from '../../hooks/use-fetch';
import { useDispatch } from 'react-redux';
import { searchActions } from '../../redux/actions/searchSlicer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import styles from './SearchBar.module.css';

const host =
    process.env.NODE_ENV === 'development'
        ? process.env.DEV_URL
        : process.env.REACT_APP_URL;

const SearchBar = () => {
    // STATE
    const [searchValue, setSearchValue] = useState('');

    // FETCH
    const { sendRequest } = useFetch(true);

    // REF
    const inputRef = useRef();

    // GLOBAL STATE
    const dispatch = useDispatch();

    // HANDLER
    const submitHandler = (e) => {
        e?.preventDefault();

        const dataHandler = (data) => {
            dispatch(searchActions.setResult(data.result));
        };

        sendRequest(
            {
                url: `${host}api/searchProduct`,
                method: 'POST',
                data: { search: inputRef.current.value },
            },
            dataHandler
        );
    };

    const searchHandler = (e) => {
        setSearchValue(e.target.value);
    };

    // SIDE EFFECT
    useEffect(() => {
        const timer = setTimeout(submitHandler, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [searchValue]);

    return (
        <div className={styles.container}>
            <h2>Find your best clothes</h2>

            <form onSubmit={submitHandler}>
                <input
                    ref={inputRef}
                    className={styles.input}
                    type="text"
                    placeholder="Search..."
                    onChange={searchHandler}
                    value={searchValue}
                />

                <button className={styles.btn}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </form>
        </div>
    );
};

export default SearchBar;

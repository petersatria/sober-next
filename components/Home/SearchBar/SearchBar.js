import { useRef, useState } from 'react';
import useFetch from '../../../hooks/use-fetch';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import SearchResultModal from './SearchResultModal';

import styles from './SearchBar.module.css';

const host =
    process.env.NODE_ENV === 'development'
        ? process.env.DEV_URL
        : process.env.REACT_APP_URL;

const SearchBar = () => {
    // FETCH
    const { sendRequest } = useFetch(true);

    // REF
    const inputRef = useRef();

    // STATE
    const [searchResult, setSearchResult] = useState(null);

    const submitHandler = (e) => {
        e.preventDefault();

        const dataHandler = (data) => {
            setSearchResult(data.result);
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

    const closeHandler = () => {
        setSearchResult(null);
    };

    return (
        <>
            {searchResult && (
                <SearchResultModal result={searchResult} onClose={closeHandler} />
            )}

            <div className={styles.container}>
                <h2>Find your best clothes</h2>

                <form onSubmit={submitHandler}>
                    <input
                        ref={inputRef}
                        className={styles.input}
                        type="text"
                        required
                        placeholder="Search..."
                    />
                    <button className={styles.btn}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </form>
            </div>
        </>
    );
};

export default SearchBar;

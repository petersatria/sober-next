import { useEffect, useRef } from 'react';
import useFetch from '../../hooks/use-fetch';
import { useDispatch, useSelector } from 'react-redux';
import { searchActions } from '../../redux/actions/searchSlicer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import styles from './SearchBar.module.css';

const host =
    process.env.NODE_ENV === 'development'
        ? process.env.DEV_URL
        : process.env.REACT_APP_URL;

const SearchBar = () => {
    // GLOBAL STATE
    // const [searchValue, setSearchValue] = useState('');
    const searchState = useSelector((state) => state.search);

    // FETCH
    const { sendRequest, result } = useFetch(true);

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

    // SIDE EFFECT
    useEffect(() => {
        const timer = setTimeout(submitHandler, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [searchState.searchValue]);

    useEffect(() => {
        if (result === 'error') dispatch(searchActions.setStatusCode(404));
        if (result === 'success') dispatch(searchActions.setStatusCode(200));
    }, [result]);

    return (
        <div className={styles.container}>
            <h2>Find your best clothes</h2>

            <form onSubmit={submitHandler}>
                <input
                    ref={inputRef}
                    className={styles.input}
                    type="text"
                    placeholder="Search..."
                    onChange={(e) =>
                        dispatch(searchActions.setSearchValue(e.target.value))
                    }
                    value={searchState.searchValue}
                />

                <button className={styles.btn}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </form>
        </div>
    );
};

export default SearchBar;

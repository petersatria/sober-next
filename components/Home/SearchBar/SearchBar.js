import useSWR from 'swr';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import styles from './SearchBar.module.css';

const host =
    process.env.NODE_ENV === 'development'
        ? process.env.DEV_URL
        : process.env.REACT_APP_URL;

const fetcher = (url) => axios.get(url).then((res) => res.data);

const SearchBar = () => {
    // const { data } = useSWR(`${host}api/searchProduct`, fetcher);

    // if (data) {
    //     console.log(data);
    // }

    return (
        <div className={styles.container}>
            <h2>Find your best clothes</h2>

            <form>
                <input
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
    );
};

export default SearchBar;

import { Fragment, useEffect, useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import useFetch from '../../hooks/use-fetch';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

import styles from './Admin.module.css';

const host =
    process.env.NODE_ENV === 'development'
        ? process.env.DEV_URL
        : process.env.REACT_APP_URL;

const fetcher = (url) => axios.get(url).then((res) => res.data.result);

const Admin = () => {
    const [items, setItems] = useState([]);

    const { sendRequest } = useFetch(true);

    const { data } = useSWR(`${host}api/product`, fetcher);

    useEffect(() => {
        if (data) {
            setItems(data);
        }
    }, [data]);

    const deleteHandler = function () {
        sendRequest({
            url: `${host}api/delete-product/${this}`,
            method: 'DELETE',
        });

        window.location.href = `${window.location.protocol}//${window.location.host}/admin`;
    };

    const rowsData = items.map((data) => (
        <Fragment key={data._id}>
            <p className={styles.col}>{data._id}</p>

            <p className={styles.col}>{data.name}</p>

            <p className={styles.col}>{data.detail}</p>

            <p className={styles.col}>{data.thumbnail}</p>

            <p className={styles.col}>
                {data?.price?.toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                })}
            </p>

            <p className={styles.col}>{data.images?.join('\n').trim()}</p>

            <Link href={`/admin/add-product/${data._id}`}>
                <a className={`${styles.col} ${styles.btn}`}>
                    <FontAwesomeIcon icon={faPencil} />
                </a>
            </Link>

            <button
                onClick={deleteHandler.bind(data._id)}
                className={`${styles.col} ${styles.btn}`}
            >
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </Fragment>
    ));

    return (
        <section className={styles.container}>
            <Link href="/admin/add-product">
                <a className={styles.add}>Add Product+</a>
            </Link>

            <div className={styles.table}>
                <p className={styles.head}>Id</p>
                <p className={styles.head}>Name</p>
                <p className={styles.head}>Detail</p>
                <p className={styles.head}>Thumbnail</p>
                <p className={styles.head}>Price</p>
                <p className={styles.head}>Images</p>
                <p className={`${styles.head} ${styles.headless}`}></p>
                <p className={`${styles.head} ${styles.headless}`}></p>

                {rowsData}
            </div>
        </section>
    );
};

export default Admin;

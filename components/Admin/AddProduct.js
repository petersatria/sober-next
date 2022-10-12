import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useFetch from '../../hooks/use-fetch';

import Notification from '../GeneralUI/Notification';

import styles from './AddProduct.module.css';
import Link from 'next/link';

const host =
    process.env.NODE_ENV === 'development'
        ? process.env.DEV_URL
        : process.env.REACT_APP_URL;

const AddProduct = () => {
    // ROUTER
    const router = useRouter();

    // HOOK FETCH
    const { sendRequest, result } = useFetch();

    // STATE
    // Image
    const [imgNum, setImgNum] = useState(1);

    // Input value
    const [nameValue, setNameValue] = useState('');
    const [priceValue, setPriceValue] = useState('');
    const [detailValue, setDetailValue] = useState('');
    const [categoryValue, setCategoryValue] = useState('');
    const [thumbnailValue, setThumbnailValue] = useState('');
    const [stockValue, setStockValue] = useState('');
    const [sizeValue, setSizeValue] = useState('');
    const [summaryValue, setSummaryValue] = useState('');
    const [imageValue, setImageValue] = useState([]);

    // Notification
    const [notif, setNotif] = useState(null);

    // HANDLER
    const submitHandler = async (e) => {
        e.preventDefault();

        const input = {
            name: nameValue,
            detail: detailValue,
            thumbnail: thumbnailValue,
            price: priceValue,
            category: categoryValue,
            size: sizeValue,
            stock: stockValue,
            images: imageValue,
        };

        console.log(input);

        await sendRequest({
            url: `${host}api/create-product`,
            method: 'POST',
            data: input,
        });
    };

    // SIDE EFFECT
    useEffect(() => {
        if (!result) return;

        if (result === 'pending') {
            setNotif({
                title: 'Sending',
                message: 'Please Wait',
                status: 'pending',
            });
            return;
        }

        if (result === 'error') {
            setNotif({
                title: 'Error',
                message: 'Product Add Failed',
                status: 'error',
            });
        }

        if (result === 'success') {
            setNotif({
                title: 'Success',
                message: 'Product Added',
                status: 'success',
            });

            setTimeout(() => router.reload(), 3000);
        }

        const timer = setTimeout(() => setNotif(null), 3000);

        return () => {
            clearTimeout(timer);
        };
    }, [result]);

    // DYNAMIC IMAGE INPUT
    const imageUrlEL = [];

    // Image Element
    for (let i = 0; i < imgNum; i++) {
        const changeHandler = (e) => {
            setImageValue((state) => {
                const cloneState = [...state];
                cloneState[i] = e.target.value;
                return cloneState;
            });
        };

        imageUrlEL.push(
            <div key={i} className={styles.control}>
                <label className={styles.label} htmlFor="image">
                    Image Link
                </label>
                <input
                    onChange={changeHandler}
                    value={imageValue[i] || ''}
                    name={`image-${i}`}
                    className={styles.input}
                    type="url"
                    id="image"
                />
            </div>
        );
    }

    // CLASS
    const controlShort = `${styles.control} ${styles.short}`;
    const buttonImage = `${styles.btn} ${styles.image}`;
    const buttonBack = `${styles.btn} ${styles.back}`;
    const textarea = `${styles.input} ${styles.textarea}`;

    return (
        <>
            {notif && (
                <Notification
                    title={notif.title}
                    message={notif.message}
                    status={notif.status}
                />
            )}

            <section className={styles.container}>
                <div className={styles.heading}>
                    <h1 className={styles.header}>Add Product</h1>

                    <Link href="/admin">
                        <a className={buttonBack}>Products</a>
                    </Link>
                </div>

                <form onSubmit={submitHandler} className={styles.form}>
                    <div className={styles.controls}>
                        <div className={styles.control}>
                            <label className={styles.label} htmlFor="name">
                                Product Name
                            </label>
                            <input
                                onChange={(e) => setNameValue(e.target.value)}
                                value={nameValue}
                                className={styles.input}
                                type="text"
                                id="name"
                                required
                            />
                        </div>

                        <div className={controlShort}>
                            <label className={styles.label} htmlFor="price">
                                Price
                            </label>
                            <input
                                onChange={(e) => setPriceValue(e.target.value)}
                                value={priceValue}
                                className={styles.input}
                                type="number"
                                id="price"
                                min="0"
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.controls}>
                        <div className={styles.control}>
                            <label className={styles.label} htmlFor="thumbnail">
                                Category
                            </label>
                            <select
                                onChange={(e) => setCategoryValue(e.target.value)}
                                className={styles.input}
                                value={categoryValue}
                                required
                            >
                                <option></option>
                                <option value="baju">Baju</option>
                                <option value="celana">Celana</option>
                                <option value="dress">Dress</option>
                                <option value="jacket">Jacket</option>
                            </select>
                        </div>

                        <div className={controlShort}>
                            <label className={styles.label} htmlFor="stock">
                                Stock
                            </label>
                            <input
                                onChange={(e) => setStockValue(e.target.value)}
                                value={stockValue}
                                className={styles.input}
                                type="number"
                                id="stock"
                                min="0"
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.controls}>
                        <div className={styles.control}>
                            <label className={styles.label} htmlFor="thumbnail">
                                Thumbnail
                            </label>
                            <input
                                onChange={(e) => setThumbnailValue(e.target.value)}
                                value={thumbnailValue}
                                className={styles.input}
                                type="url"
                                id="thumbnail"
                                required
                            />
                        </div>

                        <div className={controlShort}>
                            <label className={styles.label} htmlFor="size">
                                Size
                            </label>
                            <select
                                onChange={(e) => setSizeValue(e.target.value)}
                                className={styles.input}
                                value={sizeValue}
                                required
                            >
                                <option></option>
                                <option value="s">S</option>
                                <option value="m">M</option>
                                <option value="l">L</option>
                                <option value="xl">XL</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.control}>
                        <label className={styles.label} htmlFor="detail">
                            Product Detail
                        </label>
                        <textarea
                            onChange={(e) => setDetailValue(e.target.value)}
                            value={detailValue}
                            className={textarea}
                            type="text"
                            id="detail"
                            rows="10"
                            required
                        />
                    </div>

                    <div className={styles.control}>
                        <label className={styles.label} htmlFor="summary">
                            Summary
                        </label>
                        <textarea
                            onChange={(e) => setSummaryValue(e.target.value)}
                            value={summaryValue}
                            className={textarea}
                            type="text"
                            id="detail"
                            rows="5"
                            required
                        />
                    </div>

                    {imageUrlEL}

                    <div className={styles.actions}>
                        <div className={styles.action}>
                            <button
                                onClick={() => setImgNum((state) => state + 1)}
                                type="button"
                                className={buttonImage}
                            >
                                Add Image
                            </button>

                            <button
                                onClick={() => setImgNum((state) => state - 1)}
                                type="button"
                                className={buttonImage}
                            >
                                Remove Image
                            </button>
                        </div>

                        <button className={styles.btn}>Add Product</button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default AddProduct;

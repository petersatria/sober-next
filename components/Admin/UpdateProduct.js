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

const UpdateProduct = ({ items, id }) => {
    // INITIAL INPUT VALUE
    const initialNameValue = items.name ? items.name : '';
    const initialPriceValue = items.price ? items.price : '';
    const initialDetailValue = items.detail ? items.detail : '';
    const initialCategoryValue = items.category ? items.category : '';
    const initialThumbnailValue = items.thumbnail ? items.thumbnail : '';
    const initialStockValue = items.stock ? items.stock : '';
    const initialSizeValue = items.size ? items.size : '';
    const initialSummaryValue = items.summary ? items.summary : '';
    const initialimagesArr = items.images.length > 0 ? items.images : [];

    // ROUTER
    const router = useRouter();

    // HOOK FETCH
    const { sendRequest, result } = useFetch();

    // STATE
    // Image
    const [imgNum, setImgNum] = useState(items.images?.length || 1);

    // Input value
    const [nameValue, setNameValue] = useState(initialNameValue);
    const [priceValue, setPriceValue] = useState(initialPriceValue);
    const [detailValue, setDetailValue] = useState(initialDetailValue);
    const [categoryValue, setCategoryValue] = useState(initialCategoryValue);
    const [thumbnailValue, setThumbnailValue] = useState(initialThumbnailValue);
    const [stockValue, setStockValue] = useState(initialStockValue);
    const [imageValue, setImageValue] = useState(initialimagesArr);
    const [sizeValue, setSizeValue] = useState(initialSizeValue);
    const [summaryValue, setSummaryValue] = useState(initialSummaryValue);

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
            summary: summaryValue,
        };

        await sendRequest({
            url: `${host}api/edit-data/${id}`,
            method: 'PATCH',
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
                message: 'Product Update Failed',
                status: 'error',
            });
        }

        if (result === 'success') {
            setNotif({
                title: 'Success',
                message: 'Product Updated',
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
                    name={`image-${i}`}
                    className={styles.input}
                    type="url"
                    id="image"
                    onChange={changeHandler}
                    value={imageValue[i] || ''}
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
                    <h1 className={styles.header}>Update Product</h1>

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
                                min="0"
                                id="stock"
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
                            rows="5"
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
                            rows="3"
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

                        <button className={styles.btn}>Update Product</button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default UpdateProduct;

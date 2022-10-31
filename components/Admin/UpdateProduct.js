import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import useFetch from '../../hooks/use-fetch';

import Notification from '../GeneralUI/Notification';
import { sizeActions } from '../../redux/actions/sizeSlicer';

import styles from './AddProduct.module.css';
import Link from 'next/link';
import { token } from '../../moduleComponents/tokenAuthorization';

const host =
    process.env.NODE_ENV === 'development'
        ? process.env.DEV_URL
        : process.env.REACT_APP_URL;

import { token } from '../../moduleComponents/tokenAuthorization';

const UpdateProduct = ({ items, id }) => {
    // REDUX SELECTOR DISPATCH AND ACTIONS
    const { s, m, l, xl } = useSelector((state) => state.size);
    const dispatch = useDispatch();
    const { sActive, mActive, lActive, xlActive } = sizeActions;

    // INITIAL INPUT VALUE
    const initialNameValue = items.name ? items.name : '';
    const initialPriceValue = items.price ? items.price : '';
    const initialDetailValue = items.detail ? items.detail : '';
    const initialCategoryValue = items.category ? items.category : '';
    const initialThumbnailValue = items.thumbnail ? items.thumbnail : '';
    const initialStockSValue = items.size.s ? items.size.s : '';
    const initialStockMValue = items.size.m ? items.size.m : '';
    const initialStockLValue = items.size.l ? items.size.l : '';
    const initialStockXLValue = items.size.xl ? items.size.xl : '';
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
    const [stockSValue, setStockSValue] = useState(initialStockSValue);
    const [stockMValue, setStockMValue] = useState(initialStockMValue);
    const [stockLValue, setStockLValue] = useState(initialStockLValue);
    const [stockXLValue, setStockXLValue] = useState(initialStockXLValue);
    const [imageValue, setImageValue] = useState(initialimagesArr);
    const [sizeValue, setSizeValue] = useState('');
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
            stock: {
                s: stockSValue,
                m: stockMValue,
                l: stockLValue,
                xl: stockXLValue,
            },
            images: imageValue,
            summary: summaryValue,
        };

        const userToken = token();
        await sendRequest({
            url: `${host}api/edit-data/${id}`,
            method: 'PATCH',
            data: input,
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });
    };

    // SIDE EFFECT
    // Notification
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

    // Size
    useEffect(() => {
        if (sizeValue === 's') {
            dispatch(sActive());
        }

        if (sizeValue === 'm') {
            dispatch(mActive());
        }

        if (sizeValue === 'l') {
            dispatch(lActive());
        }

        if (sizeValue === 'xl') {
            dispatch(xlActive());
        }
    }, [sizeValue]);

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
    const stockS = `${styles.control} ${s ? '' : styles.hidden}`;
    const stockM = `${styles.control} ${m ? '' : styles.hidden}`;
    const stockL = `${styles.control} ${l ? '' : styles.hidden}`;
    const stockXL = `${styles.control} ${xl ? '' : styles.hidden}`;

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

                    <div className={styles.controls}>
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
                                <option value="s">S</option>
                                <option value="m">M</option>
                                <option value="l">L</option>
                                <option value="xl">XL</option>
                            </select>
                        </div>

                        <div className={stockS}>
                            <label className={styles.label} htmlFor="stock">
                                Stock S
                            </label>
                            <input
                                onChange={(e) => setStockSValue(e.target.value)}
                                value={stockSValue}
                                className={styles.input}
                                type="number"
                                id="stock-s"
                                min="0"
                            />
                        </div>

                        <div className={stockM}>
                            <label className={styles.label} htmlFor="stock">
                                Stock M
                            </label>
                            <input
                                onChange={(e) => setStockMValue(e.target.value)}
                                value={stockMValue}
                                className={styles.input}
                                type="number"
                                id="stock-m"
                                min="0"
                            />
                        </div>

                        <div className={stockL}>
                            <label className={styles.label} htmlFor="stock">
                                Stock L
                            </label>
                            <input
                                onChange={(e) => setStockLValue(e.target.value)}
                                value={stockLValue}
                                className={styles.input}
                                type="number"
                                id="stock-l"
                                min="0"
                            />
                        </div>

                        <div className={stockXL}>
                            <label className={styles.label} htmlFor="stock">
                                Stock XL
                            </label>
                            <input
                                onChange={(e) => setStockXLValue(e.target.value)}
                                value={stockXLValue}
                                className={styles.input}
                                type="number"
                                id="stock-xl"
                                min="0"
                            />
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

                            {imgNum > 2 && (
                                <button
                                    onClick={() => setImgNum((state) => state - 1)}
                                    type="button"
                                    className={buttonImage}
                                >
                                    Remove Image
                                </button>
                            )}
                        </div>

                        <button className={styles.btn}>Update Product</button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default UpdateProduct;

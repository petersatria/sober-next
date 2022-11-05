import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { sizeActions } from '../../redux/actions/sizeSlicer';
import { token } from '../../moduleComponents/tokenAuthorization';
import createFileList from 'create-file-list';
import {
    HtmlEditor,
    Inject,
    Link,
    QuickToolbar,
    RichTextEditorComponent,
    Toolbar,
} from '@syncfusion/ej2-react-richtexteditor';
import useFetch from '../../hooks/use-fetch';
import { notifications } from '../../moduleComponents/notification';
import LoadingSpinner from '../GeneralUI/LoadingSpinner';
import styles from './FormProduct.module.css';

// Rich Text Editor Settings
const toolbarSettings = {
    items: [
        'Bold',
        'Italic',
        'Underline',
        'StrikeThrough',
        'FontSize',
        'FontColor',
        'BackgroundColor',
        'LowerCase',
        'UpperCase',
        '|',
        'Formats',
        'Alignments',
        'OrderedList',
        'UnorderedList',
        'Outdent',
        'Indent',
        '|',
        'CreateLink',
        '|',
        'ClearFormat',
        'SourceCode',
        'FullScreen',
        '|',
        'Undo',
        'Redo',
    ],
};
const quickToolbarSettings = {
    image: [
        'Replace',
        'Align',
        'Caption',
        'Remove',
        'InsertLink',
        'OpenImageLink',
        '-',
        'EditImageLink',
        'RemoveImageLink',
        'Display',
        'AltText',
        'Dimension',
    ],
    link: ['Open', 'Edit', 'UnLink'],
};

const RTEServices = [HtmlEditor, Toolbar, QuickToolbar, Link];

const RTEItems = {
    height: 350,
    toolbarSettings: toolbarSettings,
    quickToolbarSettings: quickToolbarSettings,
};

const AddProduct = ({ header, product, method, url, type }) => {
    // REDUX SELECTOR DISPATCH AND ACTIONS
    const { xs, s, m, l, xl } = useSelector((state) => state.size);
    const dispatch = useDispatch();
    const { xsActive, sActive, mActive, lActive, xlActive } = sizeActions;

    // INITIAL INPUT VALUE
    const initialNameValue = type === 'update' ? (product?.name ? product.name : '') : '';
    const initialPriceValue =
        type === 'update' ? (product?.price ? product.price : '') : '';
    let initialDetailValue =
        type === 'update' ? (product?.detail ? product.detail : '') : '';
    const initialCategoryValue =
        type === 'update' ? (product?.category ? product.category : '') : '';
    const initialStockXSValue =
        type === 'update' ? (product['size-xs'] ? product['size-xs'] : '') : '';
    const initialStockSValue =
        type === 'update' ? (product['size-s'] ? product['size-s'] : '') : '';
    const initialStockMValue =
        type === 'update' ? (product['size-m'] ? product['size-m'] : '') : '';
    const initialStockLValue =
        type === 'update' ? (product['size-l'] ? product['size-l'] : '') : '';
    const initialStockXLValue =
        type === 'update' ? (product['size-xl'] ? product['size-xl'] : '') : '';
    let initialSummaryValue =
        type === 'update' ? (product?.summary ? product.summary : '') : '';
    const initialimagesArr =
        type === 'update' ? (product?.images?.length > 0 ? product.images : []) : '';
    const initialImageNum =
        type === 'update' ? (product?.images ? product.images.length : 1) : 1;

    // Formated Initial Detail And Summary Value
    initialDetailValue = initialDetailValue.replace(/<[^>]+>/g, '');
    initialSummaryValue = initialSummaryValue.replace(/<[^>]+>/g, '');

    // ROUTER
    const router = useRouter();

    // HOOK FETCH
    const { sendRequest, result } = useFetch();

    // STATE
    // Image
    const [imgNum, setImgNum] = useState(initialImageNum);

    // Input value
    const [nameValue, setNameValue] = useState(initialNameValue);
    const [priceValue, setPriceValue] = useState(initialPriceValue);
    const [categoryValue, setCategoryValue] = useState(initialCategoryValue);
    const [stockXSValue, setStockXSValue] = useState(initialStockXSValue);
    const [stockSValue, setStockSValue] = useState(initialStockSValue);
    const [stockMValue, setStockMValue] = useState(initialStockMValue);
    const [stockLValue, setStockLValue] = useState(initialStockLValue);
    const [stockXLValue, setStockXLValue] = useState(initialStockXLValue);
    const [sizeValue, setSizeValue] = useState('');
    const [imageValue, setImageValue] = useState(initialimagesArr);

    // File Length
    const [fileLength, setFileLength] = useState(0);

    // Loading state
    const [loading, setLoading] = useState(null);

    // HANDLER
    const submitHandler = async (e) => {
        e.preventDefault();

        const form = new FormData(e.target);

        form.append('name', nameValue);
        form.append('price', priceValue);
        form.append('category', categoryValue);
        form.append('size', sizeValue);
        form.append('stock', {
            xs: +stockXSValue,
            s: +stockSValue,
            m: +stockMValue,
            l: +stockLValue,
            xl: +stockXLValue,
        });
        form.append('imagesLink', imageValue.length > 0 ? imageValue : '');

        const userToken = token();
        await sendRequest({
            url,
            method,
            data: form,
            headers: {
                Authorization: `Bearer ${userToken}`,
                'Content-Type': 'multipart/form-data',
            },
        });
    };

    // SIDE EFFECT
    // Notification
    useEffect(() => {
        if (!result) return;

        if (result === 'pending') {
            setLoading(true);
            return;
        }

        if (result === 'error') {
            (async () =>
                await notifications({
                    statusCode: 400,
                    message: 'Something went wrong',
                }))();
        }

        if (result === 'success') {
            (async () =>
                await notifications({
                    statusCode: 200,
                    message: `${type === 'update' ? 'Product updated' : 'Product Added'}`,
                }))();

            setTimeout(() => router.reload(), 2200);
        }

        setLoading(false);
    }, [result]);

    // Size
    useEffect(() => {
        if (sizeValue === 'xs') {
            dispatch(xsActive());
        }

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

    // Initial Value
    useEffect(() => {
        setNameValue(initialNameValue);
        setPriceValue(initialPriceValue);
        setCategoryValue(initialCategoryValue);
        setStockXSValue(initialStockXSValue);
        setStockSValue(initialStockSValue);
        setStockMValue(initialStockMValue);
        setStockLValue(initialStockLValue);
        setStockXLValue(initialStockXLValue);
        setImageValue(initialimagesArr);
        setImgNum(initialImageNum);
    }, [product?._id]);

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
                    required={fileLength < 1}
                />
            </div>
        );
    }

    // CLASS
    const controlShort = `${styles.control} ${styles.short}`;
    const buttonImage = `${styles.btn} ${styles.image}`;
    const stockS = `${styles.control} ${s ? '' : styles.hidden}`;
    const stockM = `${styles.control} ${m ? '' : styles.hidden}`;
    const stockL = `${styles.control} ${l ? '' : styles.hidden}`;
    const stockXL = `${styles.control} ${xl ? '' : styles.hidden}`;
    const stockXS = `${styles.control} ${xs ? '' : styles.hidden}`;

    return (
        <>
            {loading && <LoadingSpinner />}

            <section className={styles.container}>
                <div className={styles.heading}>
                    <h1 className={styles.header}>{header}</h1>
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
                        <label className={styles.label} htmlFor="category">
                            Category
                        </label>
                        <select
                            id="category"
                            onChange={(e) => setCategoryValue(e.target.value)}
                            className={styles.input}
                            value={categoryValue}
                            required
                        >
                            <option value="baju">Baju</option>
                            <option value="celana">Celana</option>
                            <option value="dress">Dress</option>
                            <option value="jacket">Jacket</option>
                        </select>
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
                                <option value="xs">XS</option>
                                <option value="s">S</option>
                                <option value="m">M</option>
                                <option value="l">L</option>
                                <option value="xl">XL</option>
                            </select>
                        </div>

                        <div className={stockXS}>
                            <label className={styles.label} htmlFor="stock">
                                Stock XS
                            </label>
                            <input
                                onChange={(e) => setStockXSValue(e.target.value)}
                                value={stockXSValue}
                                className={styles.input}
                                type="number"
                                id="stock-xs"
                                min="0"
                            />
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

                        <RichTextEditorComponent
                            id="detail"
                            {...RTEItems}
                            value={initialDetailValue}
                        >
                            <Inject services={RTEServices} />
                        </RichTextEditorComponent>
                    </div>

                    <div className={styles.control}>
                        <label className={styles.label} htmlFor="summary">
                            Summary
                        </label>

                        <RichTextEditorComponent
                            id="summary"
                            {...RTEItems}
                            value={initialSummaryValue}
                        >
                            <Inject services={RTEServices} />
                        </RichTextEditorComponent>
                    </div>

                    <div className={styles.control}>
                        <label className={styles.label} htmlFor="image-file">
                            Images
                        </label>

                        <input
                            id="image-file"
                            type="file"
                            name="images"
                            multiple
                            onChange={(e) => setFileLength(e.target.files.length)}
                        />
                    </div>

                    <button
                        onClick={() => {
                            setImgNum((state) => state + 1);
                            setImageValue((state) => {
                                const cloneState = [...state];
                                cloneState.push('');
                                return cloneState;
                            });
                        }}
                        type="button"
                        className={buttonImage}
                    >
                        Add Image
                    </button>
                    {imageUrlEL}

                    <div className={styles.actions}>
                        <div className={styles.action}>
                            {imgNum > 1 && (
                                <button
                                    onClick={() => {
                                        setImgNum((state) => state - 1);
                                        setImageValue((state) => {
                                            const cloneState = [...state];
                                            cloneState.pop();
                                            return cloneState;
                                        });
                                    }}
                                    type="button"
                                    className={buttonImage}
                                >
                                    Remove Image
                                </button>
                            )}
                        </div>

                        <button className={styles.btn}>Send</button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default AddProduct;

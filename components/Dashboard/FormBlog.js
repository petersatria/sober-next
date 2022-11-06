import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { sizeActions } from '../../redux/actions/sizeSlicer';
import { token } from '../../moduleComponents/tokenAuthorization';
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

const FormBlog = ({ header, blog, method, url, type }) => {
    // INITIAL INPUT VALUE
    const initialCategoryValue =
        type === 'update' ? (blog?.category ? blog.category : '') : '';

    let initialContentValue =
        type === 'update' ? (blog?.content ? blog.content : '') : '';

    let initialTitleValue = type === 'update' ? (blog?.title ? blog?.title : '') : '';

    const initialTimestampValue =
        type === 'update' ? (blog?.timestamp ? blog?.timestamp : '') : '';

    const initialImageValue = type === 'update' ? (blog?.image ? blog?.image : '') : '';

    const initialTagsArr =
        type === 'update'
            ? blog?.tag?.length > 0
                ? blog.tag.join().split(',')
                : []
            : '';

    const initialTagsNum =
        type === 'update' ? (blog?.tag ? blog.tag.join().split(',').length : 1) : 1;

    // Formated Initial Content
    initialContentValue = initialContentValue.replace(/<[^>]+>/g, '');

    // Formated Initial Timestamp
    const timestampDateType = new Date(initialTimestampValue);
    const timestampYear = timestampDateType.getFullYear();
    const timestampMonth = String(timestampDateType.getMonth() + 1).padStart(2, 0);
    const timestampDate = String(timestampDateType.getDate()).padStart(2, 0);
    const timestampHour = String(timestampDateType.getHours()).padStart(2, 0);
    const timestampMinute = String(timestampDateType.getMinutes()).padStart(2, 0);
    initialTimestampValue = `${timestampYear}-${timestampMonth}-${timestampDate}T${timestampHour}:${timestampMinute}`;

    // ROUTER
    const router = useRouter();

    // HOOK FETCH
    const { sendRequest, result } = useFetch();

    // STATE
    // Image
    const [tagNum, setTagsNum] = useState(initialTagsNum);

    // Input value
    const [categoryValue, setCategoryValue] = useState(initialCategoryValue);
    const [titleValue, setTitleValue] = useState(initialTitleValue);
    const [timestampValue, setTimestampValue] = useState(initialTimestampValue);
    const [imageValue, setImageValue] = useState(initialImageValue);
    const [tagsValue, setTagsValue] = useState(initialTagsArr);

    // Image Input
    const [imageInput, setImageInput] = useState('image-link');

    // Loading State
    const [loading, setLoading] = useState(null);

    // HANDLER
    const submitHandler = async (e) => {
        e.preventDefault();

        const form = new FormData(e.target);

        form.append('category', categoryValue);
        form.append('title', titleValue);
        form.append('timestamp', timestampValue);
        form.append('tag', [...tagsValue]);
        !form.get('image') && form.append('imageLink', imageValue);

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

            // setTimeout(() => router.reload(), 2200);
        }

        setLoading(false);
    }, [result]);

    // Initial Value
    useEffect(() => {
        setTagsNum(initialTagsNum);
        setCategoryValue(initialCategoryValue);
        setTitleValue(initialTitleValue);
        setTimestampValue(initialTimestampValue);
        setImageValue(initialImageValue);
        setTagsValue(initialTagsArr);
    }, [blog?._id]);

    // DYNAMIC IMAGE INPUT
    const tagsUrlEL = [];

    // Image Element
    for (let i = 0; i < tagNum; i++) {
        const changeHandler = (e) => {
            setTagsValue((state) => {
                const cloneState = [...state];
                cloneState[i] = e.target.value;
                return cloneState;
            });
        };

        tagsUrlEL.push(
            <div key={i} className={styles.control}>
                <label className={styles.label} htmlFor="tags">
                    Tags
                </label>
                <input
                    onChange={changeHandler}
                    value={tagsValue[i] || ''}
                    name={`tag-${i}`}
                    className={styles.input}
                    type="text"
                    id="tags"
                    required
                />
            </div>
        );
    }

    // CLASS
    const buttonTags = `${styles.btn} ${styles.image}`;

    return (
        <>
            {loading && <LoadingSpinner />}

            <section className={styles.container}>
                <div className={styles.heading}>
                    <h1 className={styles.header}>{header}</h1>
                </div>

                <form onSubmit={submitHandler} className={styles.form}>
                    <div className={styles.control}>
                        <label className={styles.label} htmlFor="title">
                            Title
                        </label>
                        <input
                            onChange={(e) => setTitleValue(e.target.value)}
                            value={titleValue}
                            className={styles.input}
                            type="text"
                            id="title"
                            required
                        />
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
                            <option value="Inspiration">Inspiration</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="Photography">Photography</option>
                        </select>
                    </div>

                    <div className={styles.control}>
                        <label className={styles.label} htmlFor="content">
                            Content
                        </label>

                        <RichTextEditorComponent
                            id="content"
                            {...RTEItems}
                            value={initialContentValue}
                        >
                            <Inject services={RTEServices} />
                        </RichTextEditorComponent>
                    </div>

                    <div className={styles.control}>
                        <label className={styles.label} htmlFor="timestamp">
                            Timestamp
                        </label>

                        <input
                            id="timestamp"
                            type="datetime-local"
                            value={timestampValue}
                            onChange={(e) => setTimestampValue(e.target.value)}
                        />
                    </div>

                    <div className={styles.control}>
                        <label className={styles.label}>Image</label>
                        <select
                            onChange={(e) => setImageInput(e.target.value)}
                            className={styles.input}
                            value={imageInput}
                        >
                            <option value="image-link">Image Link</option>
                            <option value="image-file">Image File</option>
                        </select>
                    </div>

                    {imageInput === 'image-link' ? (
                        <div className={`${styles.control} tw-mb-5`}>
                            <input
                                onChange={(e) => setImageValue(e.target.value)}
                                value={imageValue}
                                className={styles.input}
                                type="url"
                                required
                            />
                        </div>
                    ) : (
                        <div className={`${styles.control} tw-mb-5`}>
                            <input id="image" type="file" required name="image" />
                        </div>
                    )}

                    <button
                        onClick={() => {
                            setTagsNum((state) => state + 1);
                            setTagsValue((state) => {
                                const cloneState = [...state];
                                cloneState.push('');
                                return cloneState;
                            });
                        }}
                        type="button"
                        className={buttonTags}
                    >
                        Add Tag
                    </button>
                    {tagsUrlEL}

                    <div className={styles.actions}>
                        <div className={styles.action}>
                            {tagNum > 1 && (
                                <button
                                    onClick={() => {
                                        setTagsNum((state) => state - 1);
                                        setTagsValue((state) => {
                                            const cloneState = [...state];
                                            cloneState.pop();
                                            return cloneState;
                                        });
                                    }}
                                    type="button"
                                    className={buttonTags}
                                >
                                    Remove Tag
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

export default FormBlog;

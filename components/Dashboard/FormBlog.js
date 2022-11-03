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
import Notification from '../GeneralUI/Notification';
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
        type === 'update' ? (blog?.tag?.length > 0 ? blog.tag : []) : '';
    const initialTagsNum = type === 'update' ? (blog?.tag ? blog.tag.length : 1) : 1;

    // Formated Initial Content and Initial Timestamp
    initialContentValue = initialContentValue.replace(/<[^>]+>/g, '');

    const timestampDateType = new Date(initialTimestampValue);
    const timestampYear = timestampDateType.getFullYear();
    const timestampMonth = String(timestampDateType.getMonth() + 1).padStart(2, 0);
    const timestampDate = String(timestampDateType.getDate()).padStart(2, 0);
    const timestampHour = timestampDateType.getHours();
    const timestampMinute = timestampDateType.getMinutes();
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

    // Notification
    const [notif, setNotif] = useState(null);

    // HANDLER
    const submitHandler = async (e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        const imageFile = form.get('imageFile');
        const input = {
            category: categoryValue,
            title: titleValue,
            content: form.get('content'),
            timestamp: timestampValue,
            image: imageValue,
            tag: tagsValue,
        };

        input.file = imageFile;
        console.log(input);

        const userToken = token();
        await sendRequest({
            url,
            method,
            data: input,
            headers: {
                Authorization: `Bearer ${userToken}`,
                // 'Content-Type': 'multipart/form-data',
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
                message: `Blog ${type === 'update' ? 'Update' : 'Add'} Failed`,
                status: 'error',
            });
        }

        if (result === 'success') {
            setNotif({
                title: 'Success',
                message: `Blog ${type === 'update' ? 'Updated' : 'Added'}`,
                status: 'success',
            });

            setTimeout(() => router.reload(), 3000);
        }

        const timer = setTimeout(() => setNotif(null), 3000);

        return () => {
            clearTimeout(timer);
        };
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
            {notif && (
                <Notification
                    title={notif.title}
                    message={notif.message}
                    status={notif.status}
                />
            )}

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
                        <label className={styles.label} htmlFor="image">
                            Image
                        </label>

                        <input id="image" type="file" name="imageFile" />
                    </div>

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

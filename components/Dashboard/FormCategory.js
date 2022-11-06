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
    // Input value
    const [nameValue, setNameValue] = useState('');

    // Notification
    const [notif, setNotif] = useState(null);

    // HANDLER
    const submitHandler = async (e) => {
        e.preventDefault();

        const input = {
            name: nameValue,
            deleted:false
        };

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
                message: `Category ${type === 'update' ? 'Update' : 'Add'} Failed`,
                status: 'error',
            });
        }

        if (result === 'success') {
            setNotif({
                title: 'Success',
                message: `Category ${type === 'update' ? 'Updated' : 'Added'}`,
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

    }, []);

    // DYNAMIC IMAGE INPUT
    const tagsUrlEL = [];

    // Image Element

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
                        <label className={styles.label} htmlFor="name">
                            Name
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

                    <div className={styles.actions}>
                        <button className={styles.btn}>ADD</button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default FormBlog;

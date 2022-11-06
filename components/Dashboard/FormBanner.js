import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { sizeActions } from '../../redux/actions/sizeSlicer';
import { token } from '../../moduleComponents/tokenAuthorization';
import Image from 'next/image'
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

const FormBanner = ({ header, banner, method, url, type, imgActive }) => {
    // INITIAL INPUT VALUE
    let initialActiveValue = type === 'update' ? (banner?.active ? banner?.active : false) : false;
    const initialImageValue = type === 'update' ? (banner?.image ? banner?.image : '') : '';
    

    // Formated Initial Content and Initial Timestamp
    

    // ROUTER
    const router = useRouter();

    // HOOK FETCH
    const { sendRequest, result } = useFetch();

    // STATE
    // Image

    // Input value
    const [imageValue, setImageValue] = useState();
    const [activeValue, setActiveValue] = useState(initialActiveValue);
    const [imageLink, setImageLink] = useState(initialImageValue)
   
    // Notification
    const [notif, setNotif] = useState(null);

    // HANDLER
    const submitHandler = async (e) => {
        e.preventDefault();

        const data = new FormData();
        if (imageValue !== undefined) {
            data.append("image", imageValue)
        } else {
            data.append("image", imageLink)
        }
        data.append("active", activeValue)
        // const imageFile = form.get('imageFile');
        const input = {
            active: activeValue,
            image: imageValue,
        };

        // input.file = imageFile;
      

        const userToken = token();
        await sendRequest({
            url,
            method,
            data: data,
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
                message: `Banner ${type === 'update' ? 'Update' : 'Add'} Failed`,
                status: 'error',
            });
        }

        if (result === 'success') {
            setNotif({
                title: 'Success',
                message: `Banner ${type === 'update' ? 'Updated' : 'Added'}`,
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
        setActiveValue(initialActiveValue);
        setImageLink(initialImageValue);
    }, [banner?._id]);

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
                    {imgActive &&
                        (<div>
                            <img
                            src={imageLink}
                            alt="Picture of the author"
                            width={200}
                            height={200} />
                            <button  onClick={(e)=> console.log("hay")}>test</button>
                        </div>)}
                <form onSubmit={submitHandler} className={styles.form}>
                    <div className={styles.control}>
                        <label className={styles.label} htmlFor="active">
                            Active
                        </label>
                        <select 
                            onChange={(e) => setActiveValue(e.target.value)}
                            value={activeValue}
                            className={styles.input}
                        >
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                        </select>
                        {/* <input
                            onChange={(e) => setActiveValue(e.target.value)}
                            value={activeValue}
                            className={styles.input}
                            type="text"
                            id="title"
                            required
                        /> */}
                    </div>

                    <div className={styles.control}>
                        <label className={styles.label} htmlFor="image">
                            Image
                        </label>

                        <input id="image" type="file" name="imageFile" className={styles.input}  onChange={(e) => setImageValue(e.target.files[0])}/>
                    </div>
                    <div className={styles.control}>
                        <label className={styles.label} htmlFor="image">
                            Image Link
                        </label>

                        <input id="image" type="text" name="imageLink" className={styles.input} onChange={(e) => setImageLink(e.target.value)}/>
                    </div>

                   

                        <button  className={styles.btn}>Send</button>
                </form>
            </section>
        </>
    );
};

export default FormBanner;

import { useState } from 'react';
import FormBlog from './FormBlog';
import styles from './FormProduct.module.css';

// Host
const host =
    process.env.NODE_ENV === 'development'
        ? process.env.DEV_URL
        : process.env.REACT_APP_URL;

function UpdateBlogs({ blogs }) {
    const [blog, setBlog] = useState(blogs[0]);

    // Handler
    const changeHandler = (e) => {
        const searchedProduct = blogs.find((blog) => blog._id === e.target.value);
        setBlog(searchedProduct);
    };

    // Component
    const option = blogs.map((blog) => (
        <option key={blog._id} value={blog._id}>
            {blog.title}
        </option>
    ));
    return (
        <>
            <div className={styles.control}>
                <label className={styles.label}>Choose Blog To Update</label>
                <select onChange={changeHandler} className={styles.input}>
                    {option}
                </select>
            </div>

            {blog && (
                <FormBlog
                    header={`Update ${blog.title}`}
                    blog={blog}
                    method="PATCH"
                    url={`${host}api/blog/articles/update/${blog._id}`}
                    type="update"
                />
            )}
        </>
    );
}

export default UpdateBlogs;

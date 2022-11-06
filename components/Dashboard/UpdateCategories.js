import { useState, useEffect } from 'react';
import FormBlog from './FormBlog';
import styles from './FormProduct.module.css';
import axios from 'axios'
// Host
const host =
    process.env.NODE_ENV === 'development'
        ? process.env.DEV_URL
        : process.env.REACT_APP_URL;

function UpdateBlogs({ blogs }) {
    const [blog, setBlog] = useState(blogs[0]);
    const [categories, setCategories] = useState([])
    console.log('categories', categories)


    useEffect(()=>{
        const getData = async () => {
            const res = await axios.get(`${host}category`);

            const data = res.data.result;
            setCategories(data);
        };

        getData();
    },[])

    // Handler
    const changeHandler = (e) => {
        const searchedProduct = blogs.find((blog) => blog._id === e.target.value);
        setBlog(searchedProduct);
    };

    // Component
    const option = categories.map((category) => (
        <option key={category._id} value={category._id}>
            {category.name}
        </option>
    ));
    return (
        <>
            <div className={styles.control}>
                <label className={styles.label} htmlFor="size">
                    Choose Category To Update
                </label>
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

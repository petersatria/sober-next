import { useState, useEffect } from 'react';
import FormCategory from './FormCategory';
import styles from './FormProduct.module.css';
import axios from 'axios'
// Host
const host =
    process.env.NODE_ENV === 'development'
        ? process.env.DEV_URL
        : process.env.REACT_APP_URL;

function UpdateCategory({ blogs }) {
    const [category, setCategory] = useState({})
    const [categories, setCategories] = useState([])


    useEffect(()=>{
        const getData = async () => {
            const res = await axios.get(`${host}category`);

            const data = res.data.result;
            setCategories(data);
            setCategory(data[0])
        };

        getData();
    },[])

    // Handler
    const changeHandler = (e) => {
        const searchedProduct = categories.find((category) => category._id === e.target.value);
        setCategory(searchedProduct);
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

            {category && (
                <FormCategory
                header={`Update ${category.name}`}
                category={category}
                method="PATCH"
                url={`${host}edit-category/${category._id}`}
                type="update"
                />
            )}
        </>
    );
}

export default UpdateCategory;

import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import FormBanner from './FormBanner';
import styles from './FormProduct.module.css';

// Host
const host =
    process.env.NODE_ENV === 'development'
        ? process.env.DEV_URL
        : process.env.REACT_APP_URL;

function UpdateBanner({ bannersData }) {
    const [banner, setBanner] = useState();
    const [banners, setBanners] = useState([]);
    // Handler
    const changeHandler = (e) => {
        const searchedProduct = banners.find((banners) => banners._id === e.target.value);
        setBanner(searchedProduct);
    };
    const getData = async () => {
        const res = await axios.get(`${host}api/banners/all`);
        const data = res.data.result;
        setBanners(data)
    };
    useEffect(() => {
        getData();
},[])
    // Component
    const option = banners.map((ban) => (
        <option key={ban._id} value={ban._id}>
            {ban._id}
        </option>
    ));
    return (
        <>
            <div className={styles.control}>
                <label className={styles.label} htmlFor="size">
                    Choose Blog To Update
                </label>
                <select onChange={changeHandler} className={styles.input}>
                    {option}
                </select>
            </div>

            {banner && (
                <FormBanner
                    header={`Update ${banner._id}`}
                    banner={banner}
                    method="PATCH"
                    imgActive={true}
                    url={`${host}api/banner/update-banner/${banner._id}`}
                    type="update"
                />
            )}
        </>
    );
}

export default UpdateBanner;

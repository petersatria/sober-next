import axios from 'axios';

import Hero from '../components/Home/Hero/Hero';
import ProductsBestWeek from '../components/Home/Product/ProductsBestWeek';
import ProductsByCategory from '../components/Home/Product/ProductsByCategory';
import Newsletter from '../components/Home/Newsletter/Newsletter';

export default function HomePage({
    productsBestWeek,
    productsBaju,
    productsCelana,
    productsDress,
    productsJacket,
}) {
    const productsCategoryItem = [
        {
            items: productsBaju,
            image: 'Products-Header-Baju.jpg',
            heading: 'Shirt',
            category: 'baju',
            id: `${Math.random()}${Date.now()}`,
        },
        {
            items: productsCelana,
            image: 'Products-Header-Celana.jpg',
            heading: 'Pants',
            category: 'celana',
            id: `${Math.random()}${Date.now()}`,
        },
        {
            items: productsDress,
            image: 'Products-Header-Dress.jpg',
            heading: 'Dress',
            category: 'dress',
            id: `${Math.random()}${Date.now()}`,
        },
        {
            items: productsJacket,
            image: 'Products-Header-Jacket.jpg',
            heading: 'Jacket',
            category: 'jacket',
            id: `${Math.random()}${Date.now()}`,
        },
    ];

    return (
        <>
            <Hero />
            <ProductsBestWeek items={productsBestWeek} />
            {productsCategoryItem.map((item) => (
                <ProductsByCategory
                    key={item.id}
                    items={item.items}
                    image={item.image}
                    heading={item.heading}
                    category={item.category}
                />
            ))}
            <Newsletter />
        </>
    );
}

export async function getStaticProps() {
    const host =
        process.env.NODE_ENV === 'development'
            ? process.env.DEV_URL
            : process.env.REACT_APP_URL;

    const res = await axios.get(`${host}api/products`);
    const products = res.data.data;

    // PRODUCTS BESTWEEK
    const productsBestWeek = products
        .filter((products) => products?.recommendation)
        .slice(0, 5);

    // PRODUCTS BAJU
    const productsBaju = products.filter((product) => product.category === 'baju');

    // PRODUCTS CELANA
    const productsCelana = products.filter((product) => product.category === 'celana');

    // PRODUCTS DRESS
    const productsDress = products.filter((product) => product.category === 'dress');

    // PRODUCTS JACKET
    const productsJacket = products.filter((product) => product.category === 'jacket');

    return {
        props: {
            productsBestWeek,
            productsBaju,
            productsCelana,
            productsDress,
            productsJacket,
        },
        revalidate: 60,
    };
}

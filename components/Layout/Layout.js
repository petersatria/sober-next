import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCart } from './../../redux/actions/cartSlicer';
import Header from './Header';
import Footer from './Footer';
import LoaderSpinner from '../GeneralUI/LoadingSpinner';

const Layout = ({ children }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCart());
        const timer = setTimeout(() => setLoading(false), 1500);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const component = loading ? (
        <LoaderSpinner />
    ) : (
        <>
            {router.pathname !== '/admin' && <Header />}
            {children}
            {router.pathname !== '/admin' && <Footer />}
        </>
    );

    return <>{component}</>;
};

export default Layout;

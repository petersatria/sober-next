import '../styles/globals.css';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { registerLicense } from '@syncfusion/ej2-base';
import store from '../redux/store';
import Layout from '../components/Layout/Layout';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Meta from '../components/meta/head';

// Registering Syncfusion license key
registerLicense(process.env.NEXT_PUBLIC_SYNCFUSION_KEY);

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        require('bootstrap/dist/js/bootstrap.bundle.min.js');
    }, []);
    return (
        <Provider store={store}>
            <Meta>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Meta>
        </Provider>
    );
}

export default MyApp;

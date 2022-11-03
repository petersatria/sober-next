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
registerLicense(
    'ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0VhW31dcH1VTmFYVEM='
);

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

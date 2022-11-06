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
import Script from 'next/script'

// Registering Syncfusion license key
registerLicense(process.env.NEXT_PUBLIC_SYNCFUSION_KEY);

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        require('bootstrap/dist/js/bootstrap.bundle.min.js');
    }, []);


    useEffect(() => {
        //change this to the script source you want to load, for example this is snap.js sandbox env
        const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js'; 
        //change this according to your client-key
        const myMidtransClientKey = 'SB-Mid-client-M7Bg5PAYXNuWbEUh'; 
        let scriptTag = document.createElement('script');
        scriptTag.src = midtransScriptUrl;
        // optional if you want to set script attribute
        // for example snap.js have data-client-key attribute
        scriptTag.setAttribute('data-client-key', myMidtransClientKey);
    
        document.body.appendChild(scriptTag);
        return () => {
        document.body.removeChild(scriptTag);
        }
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

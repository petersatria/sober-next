import { Head, NextScript, Html, Main } from 'next/document';

const Document = () => {
    return (
        <Html>
            <Head />
            <body>
                <div id="modal-root" />
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

export default Document;

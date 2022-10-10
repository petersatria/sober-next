import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.container}>
            <div className={styles.contact}>
                <p className={styles.copyright}>&copy;2022 Sober</p>

                <Link href="/contact" className={styles.link}>
                    Contact us
                </Link>
            </div>

            <div className={styles.media}>
                <Link href="https://www.instagram.com/">
                    <a className={styles.link}>
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                </Link>

                <Link href="https://id-id.facebook.com/">
                    <a className={styles.link}>
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                </Link>

                <Link href="https://twitter.com/">
                    <a className={styles.link}>
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                </Link>
            </div>
        </footer>
    );
};

export default Footer;

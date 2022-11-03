import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCartShopping,
    faMagnifyingGlass,
    faBars,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/future/image';
import styles from './Header.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { eraseCookie, getCookie } from '../../moduleComponents/cookie';
import { getUserData, isUserLoggedIn } from '../../redux/actions/authentication';
import { headerActions } from '../../redux/actions/headerSlicer';
import { confirmNotification } from '../../moduleComponents/notification';
import { useRouter } from 'next/router';

const Header = () => {
    // Local State
    const [showMenu, setShowMenu] = useState(false);

    // Global State
    const { carts } = useSelector((state) => state.carts);
    const { headerTransparant, isActive } = useSelector((state) => state.header);
    const { isLoggedIn, userInformation } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    // Router
    const router = useRouter();

    // Side Effect
    useEffect(() => {
        const scrollHandler = () => {
            if (window.scrollY > 90) return dispatch(headerActions.fillHeader());
            if (window.scrollY === 0) return dispatch(headerActions.transparantHeader());
        };

        window.addEventListener('scroll', scrollHandler);

        return () => window.removeEventListener('scroll', scrollHandler);
    }, []);

    useEffect(() => {
        if (getCookie('userCookie') !== null) {
            dispatch(getUserData(JSON.parse(getCookie('userCookie'))));
            dispatch(isUserLoggedIn(true));
            return;
        }
    }, []);

    // Styles;
    const homeLinkStyle =
        isActive === '/' ? `${styles.link} ${styles.active}` : styles.link;

    const shopLinkStyle =
        isActive === '/products' ? `${styles.link} ${styles.active}` : styles.link;

    const pagesLinkStyle =
        isActive === '/about-us' ? `${styles.link} ${styles.active}` : styles.link;

    const blogLinkStyle =
        isActive === '/blogs' ? `${styles.link} ${styles.active}` : styles.link;

    const headerStyle = headerTransparant
        ? styles.header
        : `${styles.header} ${styles['header--active']}`;

    const mobileStyle = showMenu ? `${styles.mobile} ${styles.active}` : styles.mobile;
    const mobileMenuStyle = showMenu
        ? `${styles['mobile-menu']} ${styles.active}`
        : styles['mobile-menu'];

    // Handler
    const onLogoutClick = async () => {
        let titleText = 'Are You Sure To Logout ?';
        let confirmText = 'Yes Please !';
        let confirm = await confirmNotification(titleText, confirmText);
        if (confirm) {
            dispatch(isUserLoggedIn(false));
            eraseCookie('userCookie');
            router.push('/login');
            return;
        }
    };

    const scrollUpPage = () => {
        window.scrollTo(0, 0);
    };

    // Component
    const userIsLogin = () =>
        isLoggedIn ? (
            <>
                <li className={styles.item}>
                    <Link href={`/profile/${userInformation.id}`}>
                        <a className={styles['sub-link']}>{userInformation.username}</a>
                    </Link>
                </li>

                <li className={styles.item}>
                    <a className={styles['sub-link']} onClick={onLogoutClick}>
                        Logout
                    </a>
                </li>
            </>
        ) : (
            <>
                <li className={styles.item}>
                    <Link href="/login">
                        <a
                            onClick={() =>
                                dispatch(headerActions.setActive(router.pathname))
                            }
                            className={styles['sub-link']}
                        >
                            Login
                        </a>
                    </Link>
                </li>

                <li className={styles.item}>
                    <Link href="/signup">
                        <a
                            onClick={() =>
                                dispatch(headerActions.setActive(router.pathname))
                            }
                            className={styles['sub-link']}
                        >
                            Register
                        </a>
                    </Link>
                </li>
            </>
        );

    return (
        <>
            <header className={headerStyle}>
                <nav className={styles.nav}>
                    <ul className={styles.list}>
                        <li className={styles.item}>
                            <Link href="/">
                                <a
                                    onClick={() => dispatch(headerActions.setActive('/'))}
                                    className={homeLinkStyle}
                                >
                                    Home
                                </a>
                            </Link>
                        </li>

                        <li className={styles.item}>
                            <Link href="/products">
                                <a
                                    onClick={() =>
                                        dispatch(headerActions.setActive('/products'))
                                    }
                                    className={shopLinkStyle}
                                >
                                    Shop
                                </a>
                            </Link>
                        </li>

                        <li className={styles.item}>
                            <Link href="/about-us">
                                <a
                                    onClick={() =>
                                        dispatch(headerActions.setActive('/about-us'))
                                    }
                                    className={pagesLinkStyle}
                                >
                                    About Us
                                </a>
                            </Link>
                        </li>

                        <li className={styles.item}>
                            <Link href="/blogs">
                                <a
                                    onClick={() =>
                                        dispatch(headerActions.setActive('/blogs'))
                                    }
                                    className={blogLinkStyle}
                                >
                                    Blog
                                </a>
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div>
                    <Link href="/">
                        <a>
                            <Image
                                width={232}
                                height={48}
                                src="/logo/header/logo-light.svg"
                                onClick={scrollUpPage}
                                alt="Brand Logo"
                            />
                        </a>
                    </Link>
                </div>

                <nav className={styles.nav}>
                    <ul className={styles.list}>
                        <li className={styles.item}>
                            <Link href="/search">
                                <a
                                    className={styles['sub-link']}
                                    onClick={() =>
                                        dispatch(headerActions.setActive('/search'))
                                    }
                                >
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </a>
                            </Link>
                        </li>
                        {userIsLogin()}
                        <li className={styles.item}>
                            <Link href="/cart">
                                <a
                                    className={`${styles['sub-link']} ${styles['sub-link--cart']}`}
                                    onClick={() =>
                                        dispatch(headerActions.setActive('/cart'))
                                    }
                                >
                                    <FontAwesomeIcon icon={faCartShopping} />

                                    <div className={styles.cart}>{carts.length}</div>
                                </a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>

            {/* Mobile */}
            <div className={styles['menu-icon']}>
                <button onClick={() => setShowMenu((state) => !state)}>
                    {!showMenu && <FontAwesomeIcon icon={faBars} />}
                    {showMenu && (
                        <FontAwesomeIcon icon={faXmark} className="tw-text-white" />
                    )}
                </button>
            </div>

            <div className={mobileStyle}></div>
            <div className={mobileMenuStyle}>
                <nav>
                    <ul className={`${styles.list} ${styles.menu}`}>
                        <li className={styles.item}>
                            <Link href="/">
                                <a
                                    onClick={() => {
                                        setShowMenu(false);
                                        dispatch(headerActions.setActive('/'));
                                    }}
                                    className={homeLinkStyle}
                                >
                                    Home
                                </a>
                            </Link>
                        </li>

                        <li className={styles.item}>
                            <Link href="/products">
                                <a
                                    onClick={() => {
                                        setShowMenu(false);
                                        dispatch(headerActions.setActive('/products'));
                                    }}
                                    className={shopLinkStyle}
                                >
                                    Shop
                                </a>
                            </Link>
                        </li>

                        <li className={styles.item}>
                            <Link href="/about-us">
                                <a
                                    onClick={() => {
                                        setShowMenu(false);
                                        dispatch(headerActions.setActive('/about-us'));
                                    }}
                                    className={pagesLinkStyle}
                                >
                                    About Us
                                </a>
                            </Link>
                        </li>

                        <li className={styles.item}>
                            <Link href="/blogs">
                                <a
                                    onClick={() => {
                                        setShowMenu(false);
                                        dispatch(headerActions.setActive('/blogs'));
                                    }}
                                    className={blogLinkStyle}
                                >
                                    Blog
                                </a>
                            </Link>
                        </li>
                    </ul>
                </nav>

                <nav>
                    <ul className={`${styles.list} ${styles.menu} ${styles.sublink}`}>
                        <li className={styles.item}>
                            <Link href="/search">
                                <a
                                    className={styles['sub-link']}
                                    onClick={() => {
                                        setShowMenu(false);
                                        dispatch(headerActions.setActive('/search'));
                                    }}
                                >
                                    Search
                                </a>
                            </Link>
                        </li>
                        {userIsLogin()}
                        <li className={styles.item}>
                            <Link href="/cart">
                                <a
                                    className={`${styles['sub-link']} ${styles['sub-link--cart']}`}
                                    onClick={() => {
                                        setShowMenu(false);
                                        dispatch(headerActions.setActive('/cart'));
                                    }}
                                >
                                    <FontAwesomeIcon icon={faCartShopping} />

                                    <div className={styles.cart}>{carts.length}</div>
                                </a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default Header;

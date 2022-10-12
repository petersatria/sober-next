import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCartShopping } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.css';
import { useEffect, useReducer, useState } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
// import { logoutUser } from '../../store/actions/LoginAction';
// import { eraseCookie, getCookie } from '../../moduleComponents/cookie';
import { headerActions } from '../../redux/actions/headerSlicer';

const Header = () => {
    // const { carts } = useSelector((state) => state.cart);
    // const { isLoggedIn, username } = useSelector((state) => state.user);
    const {
        blogIsActive,
        featureIsActive,
        headerTransparant,
        homeIsActive,
        pagesIsActive,
        shopIsActive,
    } = useSelector((state) => state.header);
    const dispatch = useDispatch();
    // const cookie = JSON.parse(getCookie('userCookie'));

    useEffect(() => {
        const scrollHandler = () => {
            if (window.scrollY > 90) return dispatch(headerActions.fillHeader());
            if (window.scrollY === 0) return dispatch(headerActions.transparantHeader());
        };

        window.addEventListener('scroll', scrollHandler);

        dispatch(headerActions.homeIsActive());

        return () => window.removeEventListener('scroll', scrollHandler);
    }, []);

    // Styles;
    const homeLinkStyle = homeIsActive ? `${styles.link} ${styles.active}` : styles.link;
    const shopLinkStyle = shopIsActive ? `${styles.link} ${styles.active}` : styles.link;
    const featuresLinkStyle = featureIsActive
        ? `${styles.link} ${styles.active}`
        : styles.link;
    const pagesLinkStyle = pagesIsActive
        ? `${styles.link} ${styles.active}`
        : styles.link;
    const blogLinkStyle = blogIsActive ? `${styles.link} ${styles.active}` : styles.link;

    const onLogoutClick = () => {
        dispatch(logoutUser());
        eraseCookie('userCookie');
    };

    const scrollUpPage = () => {
        window.scrollTo(0, 0);
    };

    return (
        <header
            className={
                headerTransparant
                    ? styles.header
                    : `${styles.header} ${styles['header--active']}`
            }
        >
            <nav className={styles.nav}>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link href="/">
                            <a
                                onClick={() => dispatch(headerActions.homeIsActive())}
                                className={homeLinkStyle}
                            >
                                Home
                            </a>
                        </Link>
                    </li>

                    <li className={styles.item}>
                        <Link href="/product">
                            <a
                                onClick={() => dispatch(headerActions.shopIsActive())}
                                className={shopLinkStyle}
                            >
                                Shop
                            </a>
                        </Link>
                    </li>

                    <li className={styles.item}>
                        <Link href="/features">
                            <a
                                onClick={() => dispatch(headerActions.featureIsActive())}
                                className={featuresLinkStyle}
                            >
                                Features
                            </a>
                        </Link>
                    </li>

                    <li className={styles.item}>
                        <Link href="/pages">
                            <a
                                onClick={() => dispatch(headerActions.pagesIsActive())}
                                className={pagesLinkStyle}
                            >
                                Pages
                            </a>
                        </Link>
                    </li>

                    <li className={styles.item}>
                        <Link href="/blog">
                            <a
                                onClick={() => dispatch(headerActions.blogIsActive())}
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
                        <img
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
                        <Link href="/">
                            <a className={styles['sub-link']}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </a>
                        </Link>
                    </li>
                    {/* {isLoggedIn ? (
                        <>
                            <li className={styles.item}>
                                <Link href={`/profile/${cookie.id}/details`}>
                                    <a className={styles['sub-link']}>{username}</a>
                                </Link>
                            </li>
                            <li className={styles.item}>
                                <Link>
                                    <a
                                        onClick={onLogoutClick}
                                        className={styles['sub-link']}
                                    >
                                        Logout
                                    </a>
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className={styles.item}>
                                <Link href="/login">
                                    <a className={styles['sub-link']}>Login</a>
                                </Link>
                            </li>

                            <li className={styles.item}>
                                <Link href="/signup">
                                    <a className={styles['sub-link']}>Register</a>
                                </Link>
                            </li>
                        </>
                    )} */}

                    {/* Sementara sampe integrasi ke redux dan cookies, langsung ganti aja klo mau integrasi cookie */}
                    <li className={styles.item}>
                        <Link href="/login">
                            <a
                                onClick={() => dispatch(headerActions.inActive())}
                                className={styles['sub-link']}
                            >
                                Login
                            </a>
                        </Link>
                    </li>

                    <li className={styles.item}>
                        <Link href="/signup">
                            <a
                                onClick={() => dispatch(headerActions.inActive())}
                                className={styles['sub-link']}
                            >
                                Register
                            </a>
                        </Link>
                    </li>
                    {/* ------------------------------------------------------------------------------------------- */}

                    <li className={styles.item}>
                        <Link href="/cart">
                            <a
                                className={`${styles['sub-link']} ${styles['sub-link--cart']}`}
                            >
                                <FontAwesomeIcon icon={faCartShopping} />

                                {/* <div className={styles.cart}>{carts.length}</div> */}
                            </a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;

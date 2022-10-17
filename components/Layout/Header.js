import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/future/image';
import styles from "./Header.module.css";
import { useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { eraseCookie, getCookie } from "../../moduleComponents/cookie";
import { getUserData, isUserLoggedIn } from "../../redux/actions/authentication";
import { headerActions } from "../../redux/actions/headerSlicer";
import { confirmNotification } from "../../moduleComponents/notification";
import { useRouter } from "next/router";

const Header = () => {
  // const { carts } = useSelector((state) => state.cart);
  const router = useRouter();
  const { blogIsActive, featureIsActive, headerTransparant, homeIsActive, pagesIsActive, shopIsActive } = useSelector((state) => state.header);
  const dispatch = useDispatch();
  const { isLoggedIn, userInformation } = useSelector((state) => state.auth);

  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > 90) return dispatch(headerActions.fillHeader());
      if (window.scrollY === 0) return dispatch(headerActions.transparantHeader());
    };

    window.addEventListener("scroll", scrollHandler);

    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  useEffect(() => {
    if (getCookie("userCookie") !== null) {
      dispatch(getUserData(JSON.parse(getCookie("userCookie"))));
      dispatch(isUserLoggedIn(true));
      return;
    }
  }, []);

  // Styles;
  const homeLinkStyle = homeIsActive ? `${styles.link} ${styles.active}` : styles.link;
  const shopLinkStyle = shopIsActive ? `${styles.link} ${styles.active}` : styles.link;
  const featuresLinkStyle = featureIsActive ? `${styles.link} ${styles.active}` : styles.link;
  const pagesLinkStyle = pagesIsActive ? `${styles.link} ${styles.active}` : styles.link;
  const blogLinkStyle = blogIsActive ? `${styles.link} ${styles.active}` : styles.link;
  const headerStyle = headerTransparant ? styles.header : `${styles.header} ${styles["header--active"]}`;

  const onLogoutClick = async () => {
    let titleText = "Are You Sure To Logout ?";
    let confirmText = "Yes Please !";
    let confirm = await confirmNotification(titleText, confirmText);
    if (confirm) {
      dispatch(isUserLoggedIn(false));
      eraseCookie("userCookie");
      router.push("/login");
      return;
    }
  };

  const scrollUpPage = () => {
    window.scrollTo(0, 0);
  };

  const userIsLogin = () =>
    isLoggedIn ? (
      <>
        <li className={styles.item}>
          <Link href={`/profile/${userInformation.id}`}>
            <a className={styles["sub-link"]}>{userInformation.username}</a>
          </Link>
        </li>

        <li className={styles.item}>
          <a className={styles["sub-link"]} onClick={onLogoutClick}>
            Logout
          </a>
        </li>
      </>
    ) : (
      <>
        <li className={styles.item}>
          <Link href="/login">
            <a onClick={() => dispatch(headerActions.inActive())} className={styles["sub-link"]}>
              Login
            </a>
          </Link>
        </li>

        <li className={styles.item}>
          <Link href="/signup">
            <a onClick={() => dispatch(headerActions.inActive())} className={styles["sub-link"]}>
              Register
            </a>
          </Link>
        </li>
      </>
    );

  return (
    <header className={headerStyle}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link href="/">
              <a onClick={() => dispatch(headerActions.homeIsActive())} className={homeLinkStyle}>
                Home
              </a>
            </Link>
          </li>

          <li className={styles.item}>
            <Link href="/products">
              <a onClick={() => dispatch(headerActions.shopIsActive())} className={shopLinkStyle}>
                Shop
              </a>
            </Link>
          </li>

          <li className={styles.item}>
            <Link href="/about-us">
              <a onClick={() => dispatch(headerActions.pagesIsActive())} className={pagesLinkStyle}>
                About Us
              </a>
            </Link>
          </li>

          <li className={styles.item}>
            <Link href="/blogs">
              <a onClick={() => dispatch(headerActions.blogIsActive())} className={blogLinkStyle}>
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
          {userIsLogin()}

          {/* ------------------------------------------------------------------------------------------- */}

          <li className={styles.item}>
            <Link href="/cart">
              <a className={`${styles["sub-link"]} ${styles["sub-link--cart"]}`}>
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

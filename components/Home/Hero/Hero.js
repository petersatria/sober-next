import Link from 'next/link';
import Slider from 'react-slick';

import styles from './Hero.module.css';

const Hero = () => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 10000,
        speed: 2000,
        pauseOnHover: false,
        pauseOnFocus: true,
        appendDots: (dots) => (
            <div
                style={{
                    transform: 'translateY(-3rem)',
                    backgroundColor: 'transparent',
                }}
            >
                <ul
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    {dots}
                </ul>
            </div>
        ),
    };

    return (
        <Slider {...settings}>
            <div className={styles.slider}>
                <div className={`${styles.slide} ${styles['slide-0']}`}>
                    <div className={styles.content}>
                        <h2 className={styles.heading}>Man Collection</h2>

                        <Link href="/products">
                            <a className={styles.link}>Shop Now</a>
                        </Link>
                    </div>
                </div>
            </div>

            <div className={styles.slider}>
                <div className={`${styles.slide} ${styles['slide-1']}`}>
                    <div className={styles.content}>
                        <h2 className={styles.heading}>Woman Collection</h2>

                        <Link href="/products">
                            <a className={styles.link}>Shop Now</a>
                        </Link>
                    </div>
                </div>
            </div>
        </Slider>
    );
};

export default Hero;

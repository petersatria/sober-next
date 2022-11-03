import { useEffect, useState } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import Image from 'next/future/image';

const Hero = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setScreenWidth(window.innerWidth);
        });

        return () => {
            window.removeEventListener('resize', () => {
                setScreenWidth(window.innerWidth);
            });
        };
    }, []);

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
                        padding: '0',
                    }}
                >
                    {dots}
                </ul>
            </div>
        ),
    };

    return (
        <Slider {...settings}>
            {/* Slider 1 */}
            <div className="tw-relative tw-h-[90vh] tw-w-full tw-overflow-hidden focus:tw-outline-none">
                <Image
                    src="/images/hero/Hero-1.webp"
                    alt="Hero Image"
                    fill
                    priority="low"
                    style={{
                        objectFit: `${screenWidth > 768 ? 'contain' : 'cover'}`,
                        top: '0',
                        left: '0',
                        zIndex: '8',
                    }}
                />

                <div className="tw-absolute tw-top-1/2 tw-right-1/2 tw-z-10 tw-flex tw-translate-x-1/2 -tw-translate-y-1/2 tw-flex-col tw-items-center tw-gap-14 tw-rounded-md tw-bg-soberslate tw-p-4 tw-text-white sm:tw-top-[12rem] sm:tw-right-[2rem] sm:tw-translate-x-0 sm:tw-translate-y-0 sm:tw-bg-transparent sm:tw-p-0 sm:tw-text-black md:tw-right-[3rem] md:tw-gap-y-28 lg:tw-right-[4rem] xl:tw-right-[10rem]">
                    <h2 className=" tw-text-center tw-text-5xl  tw-font-light sm:tw-text-5xl  lg:tw-text-6xl 2xl:tw-text-7xl">
                        {' '}
                        Man Collection
                    </h2>

                    <Link href="/products">
                        <a className="tw-border-b tw-border-white tw-border-b-transparent tw-pb-1 tw-text-base tw-font-thin tw-tracking-wide tw-text-white tw-no-underline tw-duration-200 hover:tw-border-b hover:tw-border-b-white sm:tw-border-black sm:tw-text-black sm:hover:tw-border-b-black md:tw-text-lg xl:tw-text-xl">
                            Show Now
                        </a>
                    </Link>
                </div>
            </div>

            {/* Slider 2 */}
            <div className="tw-relative tw-h-[90vh] tw-w-full tw-overflow-hidden focus:tw-outline-none">
                <Image
                    src="/images/hero/Hero-2.webp"
                    alt="Hero Image"
                    fill
                    style={{
                        objectFit: `${+window.innerWidth > 768 ? 'contain' : 'cover'}`,
                        // position: 'absolute',
                        top: '0',
                        left: '0',
                        zIndex: '8',
                        outlineColor: 'transparent',
                    }}
                />

                <div className="sm:tw-top tw-absolute tw-top-1/2 tw-right-1/2 tw-z-10 tw-flex tw-translate-x-1/2 tw-flex-col tw-items-center tw-gap-14 tw-rounded-md tw-bg-soberslate tw-p-6 tw-text-center tw-text-white md:tw-top-24 md:tw-left-6  md:tw-w-min md:tw-translate-x-0 md:tw-bg-transparent md:tw-text-black xl:tw-left-32 xl:tw-top-1/2 xl:-tw-translate-y-1/2">
                    <h2 className=" tw-text-5xl  tw-font-light  lg:tw-text-6xl 2xl:tw-text-7xl">
                        {' '}
                        Woman Collection
                    </h2>

                    <Link href="/products">
                        <a className="tw-border-b tw-border-white tw-border-b-transparent tw-pb-1 tw-text-base tw-font-thin tw-tracking-wide tw-text-white tw-no-underline tw-duration-200 hover:tw-border-b hover:tw-border-b-white md:tw-border-b-black md:tw-text-lg md:tw-text-black md:hover:tw-border-black xl:tw-text-xl">
                            Show Now
                        </a>
                    </Link>
                </div>
            </div>
        </Slider>
    );
};

export default Hero;
//     <div className={styles.slider}>
//         <div className={`${styles.slide} ${styles['slide-0']}`}>
//             <div className={styles.content}>
//                 <h2 className={styles.heading}>Man Collection</h2>

//                 <Link href="/products">
//                     <a className={styles.link}>Shop Now</a>
//                 </Link>
//             </div>
//         </div>
//     </div>

//     <div className={styles.slider}>
//         <div className={`${styles.slide} ${styles['slide-1']}`}>
//             <div className={styles.content}>
//                 <h2 className={styles.heading}>Woman Collection</h2>

//                 <Link href="/products">
//                     <a className={styles.link}>Shop Now</a>
//                 </Link>
//             </div>
//         </div>
//     </div>
// </Slider>;

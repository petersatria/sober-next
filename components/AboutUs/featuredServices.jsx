import styles from "../../styles/aboutUs.module.css";
import Slider from "react-slick";
import Image from "next/future/image";
// Images
import rocketIcon from "../../public/aboutAssets/rocket-icon.png";
import userIcon from "../../public/aboutAssets/user-icon.png";
import handsIcon from "../../public/aboutAssets/hands-icon.jpg";
import cart from "../../public/aboutAssets/cart.png";
import clothes from "../../public/aboutAssets/clothes.png";
import discount from "../../public/aboutAssets/discount.png";

const FeaturedServices = () => {
  // i decide to make them different 2 arrays inside because each data have different css condition to loop
  const dataFeaturedService1 = [
    [
      {
        image: rocketIcon,
        title: "Free Shipping",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo nulla quibusdam nostrum error voluptatibus sapiente tenetur, placeat aperiam omnis odio, quos pariatur unde sunt dolorem tempora debitis beatae? Quam, amet!",
      },
      {
        image: userIcon,
        title: "24/7 Support",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo nulla quibusdam nostrum error voluptatibus sapiente tenetur, placeat aperiam omnis odio, quos pariatur unde sunt dolorem tempora debitis beatae? Quam, amet!",
      },
      {
        image: handsIcon,
        title: "Payment Process",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo nulla quibusdam nostrum error voluptatibus sapiente tenetur, placeat aperiam omnis odio, quos pariatur unde sunt dolorem tempora debitis beatae? Quam, amet!",
      },
    ],
    [
      {
        image: cart,
        title: "Easy To Checkout",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo nulla quibusdam nostrum error voluptatibus sapiente tenetur, placeat aperiam omnis odio, quos pariatur unde sunt dolorem tempora debitis beatae? Quam, amet!",
      },
      {
        image: clothes,
        title: "Best Quality Product",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo nulla quibusdam nostrum error voluptatibus sapiente tenetur, placeat aperiam omnis odio, quos pariatur unde sunt dolorem tempora debitis beatae? Quam, amet!",
      },
    ],
  ];

  const cssFeatureImg = {
    marginLeft: "44%",
    marginBottom: "20px",
  };
  const cssFeatureImg2 = {
    marginLeft: "45%",
    marginBottom: "20px",
    width: "20%",
    height: "20%",
  };
  const cssFeatureImg3 = {
    marginLeft: "45%",
    marginBottom: "30px",
    marginTop: "30px",
    width: "20%",
    height: "20%",
  };

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 930,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          nextArrow: "",
          prevArrow: "",
        },
      },
    ],
  };

  function Arrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", filter: "invert(1)" }}
        onClick={onClick}
      />
    );
  }
  return (
    <div>
      <div className={`${styles.featuredArea} row px-md-5 px-sm-0`}>
        <div className="col-xxl-12 text-center mb-md-3 mb-sm-0">
          <h2 className={styles.textTitleFetured}>Featured Services</h2>
        </div>
        <div className="row col-xxl-12 text-center m-auto mt-5">
          <Slider {...settings}>
            {dataFeaturedService1[0].map((data, index) => (
              <div key={index} className={`${styles.areaPerFeature}`}>
                <Image src={data.image} style={cssFeatureImg}></Image>
                <h4 className={styles.textTitleFeatured}>{data.title}</h4>
                <p className={styles.textPerFeature}>{data.description}</p>
              </div>
            ))}
            {dataFeaturedService1[1].map((data, index) => (
              <div key={index} className={`${styles.areaPerFeature}`}>
                <Image src={data.image} style={cssFeatureImg2}></Image>
                <h4 className={styles.textTitleFeatured}>{data.title}</h4>
                <p className={styles.textPerFeature}>{data.description}</p>
              </div>
            ))}
            <div className={`${styles.areaPerFeature}`}>
              <Image src={discount} style={cssFeatureImg3}></Image>
              <h4 className={styles.textTitleFeatured}>Payment Process</h4>
              <p className={styles.textPerFeature}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo nulla quibusdam nostrum error voluptatibus sapiente
                tenetur, placeat aperiam omnis odio, quos pariatur unde sunt
                dolorem tempora debitis beatae? Quam, amet!
              </p>
            </div>
          </Slider>
        </div>
      </div>
      <div className={styles.hero2Area}>
        <div className={`row px-5 ${styles.hero2}`}>
          <div className="col-xxl-7 text-center">
            <p className={styles.textFounder}>The Founder</p>
            <p className={styles.textFounder2}>
              Nemo enim ipsam quia sit aut odit aut fugit, sed quia consequuntur
              magni
              <br />
              dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
              quisquam est, qui dolorem ipsum
              <br />
              quia dolor sit amet, consectetur, adipisci velit, sed quia non
              numquam eius modi tempora incidunt ut
              <br />
              labore et dolore magnam aliquam.
            </p>
            <p className={styles.nameFounder}>Andrew Sober</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedServices;

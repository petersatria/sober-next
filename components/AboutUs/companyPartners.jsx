import styles from "../../styles/aboutUs.module.css";
import Newsletter from "../../components/Home/Newsletter/Newsletter";
import Image from "next/future/image";
import Slider from "react-slick";
// Images
import graphicer from "../../public/aboutAssets/logo-1.png";
import themeforest from "../../public/aboutAssets/logo-2.png";
import audioJungle from "../../public/aboutAssets/logo-3.png";
import threeOcean from "../../public/aboutAssets/logo-4.png";
import videoHive from "../../public/aboutAssets/logo-5.png";
import photoDune from "../../public/aboutAssets/logo-6.png";
import codeCanyon from "../../public/aboutAssets/logo-7.png";

const CompanyPartners = () => {
  // there are 2 images that are not include inside because they have different bootstrap condition
  const companiesImage = [
    {
      image: graphicer,
    },
    {
      image: themeforest,
    },
    {
      image: audioJungle,
    },
    {
      image: threeOcean,
    },
    {
      image: videoHive,
    },
    {
      image: photoDune,
    },
    {
      image: codeCanyon,
    },
  ];

  var settings = {
    dots: true,
    infinite: true,
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
        breakpoint: 800,
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
          prevArrow: "",
          nextArrow: "",
        },
      },
    ],
  };

  function Arrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          filter: "invert(1)",
        }}
        onClick={onClick}
      />
    );
  }
  return (
    <div>
      <div className="row justify-content-center text-center mt-5 mb-5">
        <div className="col-xxl-6">
          <h1>Company Partners</h1>
        </div>
      </div>
      <div style={{ width: "90%", margin: "auto" }}>
        <Slider {...settings}>
          {/* map */}
          {companiesImage.map((data, index) => (
            <div key={index}>
              <div className={styles.borderBrandImg}>
                <Image src={data.image}></Image>
              </div>
            </div>
          ))}
          {/*  */}
        </Slider>
        {/*  */}
      </div>
      <Newsletter />
    </div>
  );
};

export default CompanyPartners;

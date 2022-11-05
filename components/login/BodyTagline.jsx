import Image from "next/image";
import sober from "../../public/loginAssets/sober.png";
import styles from "../../styles/login.module.css";

const BodyTagline = () => {
  return (
    <div className="col-md-8 col-sm-12 col-lg-6 col-xl-6 text-center justify-content-center">
      <div className="row justify-content-center">
        <div className="col-xl-6 col-lg-7 col-md-6 col-xs-4 col-sm-6 col-6">
          <Image
            src={sober}
            layout="intrinsic"
            width={"350px"}
            height={"110px"}
            alt="Sober"
            className={`${styles.imgTagline}`}
          />
        </div>
      </div>
      {/* <img src="/sober.png" className="img-fluid img-tagline mb-sm-4 mb-3" alt="sober" /> */}
      <p className={styles.textTagline}>Born To Dress Like King & Queen</p>
    </div>
  );
};

export default BodyTagline;

import Image from "next/image";
import sober from "../../public/loginAssets/sober.png";
import styles from "../../styles/login.module.css";

const BodyTagline = () => {
  return (
    <div className="col-md-5 col-sm-12 col-lg-7 col-xl-6 text-center">
      {/* <img src="/sober.png" className="img-fluid img-tagline mb-sm-4 mb-3" alt="sober" /> */}
      <Image
        src={sober}
        layout="intrinsic"
        width={"350px"}
        height={"110px"}
        alt="Sober"
        className={`mb-sm-4 mb-3 ${styles.imgTagline}`}
      />
      <p className={styles.textTagline}>Born To Dress Like King & Queen</p>
    </div>
  );
};

export default BodyTagline;

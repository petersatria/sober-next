import Page from "../../components/Page";
import styles from "../../styles/aboutUs.module.css";
import Link from "next/link";

const index = () => {
  return (
    <Page title={"About Us"} description={"Sober"}>
      <div className={styles.generalArea}>
        <div className="row text-center">
          <div className={`col-md-12 ${styles.heroArea}`}>
            <div className={`col-md-12 ${styles.aboutText}`}>
              <h1>About Us</h1>
            </div>
            <div className="col-md-12 d-flex justify-content-center mt-4">
              <Link href={"/"}>
                <p className={styles.linkHome}>Home</p>
              </Link>
              <span className={`ms-2 me-2 ${styles.linkSign}`}>{`>`}</span>
              <p className={styles.linkAboutUs}>About Us</p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-7 mt-5">
            <h4 className={`mb-5 ${styles.companyTitleDescription}`}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.</h4>
            <p className={styles.companyDescription}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, in! Ullam qui iure doloremque ad inventore laboriosam ab fugit iste excepturi distinctio dignissimos, illo necessitatibus optio consequatur, esse quasi porro. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, aliquid a, commodi aperiam pariatur magni nulla atque ab laborum obcaecati, sunt dicta qui expedita! Repudiandae deleniti id ea accusamus magni. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam cupiditate quis asperiores quibusdam impedit ut eligendi omnis libero officia eaque commodi, dolor qui, odio cum rerum distinctio animi aliquam nulla!</p>
          </div>
        </div>
        <div className="row">
            <div className="col-md-12">
                <h2>Featured Services</h2>
            </div>
            <div className="col-md-12">

            </div>
        </div>
      </div>
    </Page>
  );
};

export default index;

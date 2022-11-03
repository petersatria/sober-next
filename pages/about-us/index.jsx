import Hero from "../../components/AboutUs/hero";
import FeaturedServices from "../../components/AboutUs/featuredServices";
import CompanyPartners from "../../components/AboutUs/companyPartners";
import Page from "../../components/Page";
import "@fontsource/montez";

const index = () => {
  return (
    <Page title={"About Us"} description={"Sober"}>
      <div className="container-fluid">
        <Hero />
        <FeaturedServices />
        <CompanyPartners />
      </div>
    </Page>
  );
};

export default index;

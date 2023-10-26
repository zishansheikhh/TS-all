import Banner from "../../component/banner/banner.component";
import CategoriesSlider from "../../component/product-list/categories-slider.component";
import ProducList from "../../component/product-list/product-list.component";
import USP from "../../component/usp/usp.component";
import Topbar from "../../component/topbar/topbar.component";
import FooterSection from "../../component/footer/footer.component";

const LandingPage = () => {
  return (
    <div>
      <Topbar/>
      <Banner />
      <USP />
      <CategoriesSlider />
      <ProducList />
      <FooterSection />
    </div>
  );
};

export default LandingPage;

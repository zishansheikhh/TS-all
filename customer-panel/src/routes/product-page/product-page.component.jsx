import BottomNav from "../../component/bottom-nav/bottom-nav.component";
import ProductPageComponent from "../../component/product-page/product-slider.component";
import Topbar from "../../component/topbar/topbar.component";

const ProducPage = () => {
    return (
        <div>
            <Topbar />
            <div className="container-fluid m-auto">
                <ProductPageComponent />
            </div>
            <BottomNav />
        </div>
    )
}
    
export default ProducPage;
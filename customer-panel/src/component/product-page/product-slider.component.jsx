import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import ProductCta from "./product-cta.component";
import ProductCustomization from "./product-customization.component";
import ProducDescription from "./product-desc.component";

import ProductImg1 from '../../assets/products/1_diamond-necklace-72f01053fd31ee74998e9d06354ebddf.jpeg';
import ProductImg3 from '../../assets/products/7_baby-pink-51824b6190e9984e79e06444dc15138a.jpeg';
import ProductImg4 from '../../assets/products/11_1_demon-slayer---kimetsu-no-yaiba-84b3f09c2085cb2abb3b8e3e102d9b23.jpg';
import ProductImg5 from '../../assets/products/1_diamond-necklace-72f01053fd31ee74998e9d06354ebddf.jpeg';
import ProductImg6 from '../../assets/products/1_diamond-necklace-72f01053fd31ee74998e9d06354ebddf.jpeg';

import './product-page.styles.css';


const ProductPageComponent = () => {

    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        autoplay: false,
        slidesToShow: 1,
        lazyLoad: 'ondemand',
        slidesToScroll: 1
    };

    return (
        <div>
            <div className="page-navigation-bar">
            <h3 className="ml-2 f-weight-100"><Link to='/'><FontAwesomeIcon icon="fa-solid fa-arrow-left-long" /></Link> &nbsp;Customize your T-shirt</h3>
            </div>

            <div className="product-page-wrapper">
                {/* product slider */}
                <div className="product-page-left-side">
                    <div className="product-img-container">
                        <Slider {...settings}>
                            <div className="cards-basic product-gallery-card">
                                <img src= {ProductImg1} alt="CategoryImg 1"/>
                            </div>

                            <div className="cards-basic product-gallery-card">
                                <img src= {ProductImg3} alt="CategoryImg 1"/>
                            </div>

                            <div className="cards-basic product-gallery-card">
                                <img src= {ProductImg4} alt="CategoryImg 1"/>
                            </div>

                            <div className="cards-basic product-gallery-card">
                                <img src= {ProductImg5} alt="CategoryImg 1"/>
                            </div>

                            <div className="cards-basic product-gallery-card">
                                <img src= {ProductImg6} alt="CategoryImg 1"/>
                            </div>
                        </Slider>
                    </div>
                </div>
                <div className="product-page-right-side">
                    <div className="product-price-container d-flex jc-space-btw al-item-cen">
                        <div className="mt-2">
                            <h3>Demon Slayer T-Shirt</h3>
                            <p>INR 450.00</p>
                        </div>
                        <span className="mt-2 f-size-1"><FontAwesomeIcon icon="fa-regular fa-heart" /></span>
                    </div>
                    <div>
                        <p>15 reviews</p>
                        <p>or 3 monthly payments of ₹266 with
                        Credit card NOT required, Online approval in 2 minutes
                        Flat 15% cashback up to ₹1000. T&C
                        </p>
                    </div>
                    <div>
                    <form className="mt-2 mb-3">
                        <p>Choose your favourite Fabric</p>
                        <label>
                            Cotton
                            <input type="radio" name="test" value="small"  defaultChecked />
                        </label>

                        <label>
                            Rayon
                            <input type="radio" name="test" value="big" />
                        </label>

                        <label>
                            Crepe
                            <input type="radio" name="test" value="big" />
                        </label>
                    </form>
                    </div>
                    {/* product info */}
                    <ProductCustomization />
                    {/* product cta */}
                    <ProductCta />
                    {/* product description */}
                    <ProducDescription />  
                </div>
            </div>     
        </div>
    )
}
    
export default ProductPageComponent;
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './product-list.styles.css';

import PCCategoryImg1 from '../../assets/sliders/bitmoji.jpg';
import PCCategoryImg2 from '../../assets/sliders/fandom tshirt.jpg';
import PCCategoryImg3 from '../../assets/sliders/man solid.jpg';
import PCCategoryImg4 from '../../assets/sliders/men formal.jpg';
import PCCategoryImg5 from '../../assets/sliders/men printed.jpg';

import CategoryImg1 from '../../assets/categories/1_Category_1656234230.jpeg';
import CategoryImg2 from '../../assets/categories/2_Category_1656234244.jpeg';
import CategoryImg3 from '../../assets/categories/3_Category_1656234255.jpeg';
import CategoryImg4 from '../../assets/categories/4_Category_1656319515.jpeg';
import CategoryImg5 from '../../assets/categories/5_Category_1657799220.jpeg';

const CategoriesSlider = () => {
    const settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 300,
        lazyLoad: 'ondemand',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
            {
                breakpoint: 499,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const pcCategoryImages = [
        PCCategoryImg1,
        PCCategoryImg2,
        PCCategoryImg3,
        PCCategoryImg4,
        PCCategoryImg5,
    ];

    const mobileCategoryImages = [
        CategoryImg1,
        CategoryImg2,
        CategoryImg3,
        CategoryImg4,
        CategoryImg5,
    ];

    return (
        <div className='container-fluid m-auto'>
            <h2 className='default-header mt-3'>Shop from the best</h2>
            {/* mobile view */}
            <div className='mobile-category-slider-container'>
                <Slider {...settings}>
                    {mobileCategoryImages.map((image, index) => (
                        <div key={index} className='cards-basic category-card'>
                            <img src={image} alt={`CategoryImg ${index}`} />
                        </div>
                    ))}
                </Slider>
            </div>

            {/* desktop view */}
            <div className='pc-category-slider-container'>
                <div className='pc-category-container'>
                    {pcCategoryImages.map((image, index) => (
                        <div key={index} className='cards-basic category-card'>
                            <img src={image} alt={`CategoryImg ${index}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoriesSlider;

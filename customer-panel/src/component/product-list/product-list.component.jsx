import React from 'react';
import Arrowrighticon from '../../assets/right-arrow.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './product-list.styles.css';

import ProductImg1 from '../../assets/products/1_diamond-necklace-72f01053fd31ee74998e9d06354ebddf.jpeg';
import ProductImg3 from '../../assets/products/7_baby-pink-51824b6190e9984e79e06444dc15138a.jpeg';
import ProductImg4 from '../../assets/products/11_1_demon-slayer---kimetsu-no-yaiba-84b3f09c2085cb2abb3b8e3e102d9b23.jpg';
import ProductImg5 from '../../assets/products/1_diamond-necklace-72f01053fd31ee74998e9d06354ebddf.jpeg';
import ProductImg6 from '../../assets/products/1_diamond-necklace-72f01053fd31ee74998e9d06354ebddf.jpeg';

const productList = [
    {
        id: 1,
        image: ProductImg1,
        price: 'INR 599',
        title: 'Demon Slayer'
    },
    {
        id: 2,
        image: ProductImg3,
        price: 'INR 599',
        title: 'Demon Slayer'
    },
    {
        id: 3,
        image: ProductImg4,
        price: 'INR 599',
        title: 'Demon Slayer'
    },
    {
        id: 4,
        image: ProductImg5,
        price: 'INR 599',
        title: 'Demon Slayer'
    },
    {
        id: 5,
        image: ProductImg6,
        price: 'INR 599',
        title: 'Capt. America'
    },
    {
        id: 6,
        image: ProductImg1,
        price: 'INR 599',
        title: 'Naruto'
    },
];

const ProductList = () => {
    return (
        <div className='container-fluid m-auto'>
            <h3 className="mt-4 d-flex al-item-cen default-header">Men's Tshirt <img src={Arrowrighticon} alt="" className="header-right-icon ml-2" /></h3>
            <div className="product-list-container mb-5">
                {productList.map(product => (
                    <Link to='/product-page' key={product.id}>
                        <div className="product-card-wrapper">
                            <div className="cards-basic product-card">
                                <img src={product.image} alt={`Product ${product.id}`} />
                            </div>
                            <div className="product-info d-flex jc-space-btw">
                                <p>{product.price}</p>
                                <span><FontAwesomeIcon icon={["far", "heart"]} /></span>
                            </div>
                            <div className="product-action d-flex jc-center">
                                <span className="w-100">{product.title}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <h3 className="mt-4 d-flex al-item-cen default-header">Women's Tshirt <img src={Arrowrighticon} alt="" className="header-right-icon ml-2" /></h3>
            <div className="product-list-container mb-5">
                {productList.map(product => (
                    <Link to='/product-page' key={product.id}>
                        <div className="product-card-wrapper">
                            <div className="cards-basic product-card">
                                <img src={product.image} alt={`Product ${product.id}`} />
                            </div>
                            <div className="product-info d-flex jc-space-btw">
                                <p>{product.price}</p>
                                <span><FontAwesomeIcon icon={["far", "heart"]} /></span>
                            </div>
                            <div className="product-action d-flex jc-center">
                                <span className="w-100">{product.title}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>

        
    );
}

export default ProductList;
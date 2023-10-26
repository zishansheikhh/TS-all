import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import React, { Component } from 'react'
import Emptycart from '../../assets/shopping-cart.gif';
import CartProductImg from '../../assets/products/10_0_moon-knight-7291fb5c55e10d9ed27a03da959a0d61.jpg'
import { Link } from 'react-router-dom';
import './account.styled.css'
import { useState } from 'react';

const Cart = () => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isCustomizationPopupOpen, setIsCustomizationPopupOpen] = useState(false);
    const [isProductEditPopupOpen, setIsProductEditPopupOpen] = useState(false);

    

    const handleCustomizationButtonClick = () => {
        setIsCustomizationPopupOpen(!isCustomizationPopupOpen);
    };

    const handleProductEditButtonClick = () => {
        setIsProductEditPopupOpen(!isProductEditPopupOpen);
    };

    const handleButtonClick = () => {
        setIsPopupOpen(!isPopupOpen);

  };    

    return (
        <div>
            <div className="page-navigation-bar">
            <h2 className="ml-2 default-header"><Link to='/'><FontAwesomeIcon icon="fa-solid fa-arrow-left-long" /></Link> &nbsp;Your Cart</h2>
            </div>
            <div className='container-fluid m-auto'>
                <div className='empty-cart d-none'>
                    <div className='d-flex jc-center mt-5 h-50 al-item-cen'>
                        <img src={Emptycart} alt='Cart Empty' className='main-logo-med' />
                        <p>Cart is empty</p>
                    </div>
                </div>
                <div className='cart-container mt-3'>
                    <div className='cart-items-wrapper d-flex jc-space-btw al-item-cen'>
                        <div className='padding-5'>
                            <img src={CartProductImg} alt='Cart item' />
                        </div>
                        <div className='padding-5'>
                            <p>Jujutsu Kaisen Anime TShirt</p>
                            <p>Customization 
                                <span>
                                    <button onClick={handleCustomizationButtonClick} className='edit-customization-btn'>
                                        <FontAwesomeIcon icon="fa-regular fa-pen-to-square" />
                                    </button>
                                </span>
                                {isCustomizationPopupOpen && (
                                // Popup content goes here
                                <div className="edit-customization-popup">
                                    <h4>Edit your customization</h4>
                                    <input placeholder='65cm your shoulder' type='number'/>
                                    <input placeholder='125cm your chest' type='number'/>
                                    <input placeholder='50cm dress length' type='text'/>
                                    <input placeholder='60cm your sleeve length' type='text'/>
                                    <input placeholder='Slim fit' type='text'/>
                                    <input placeholder='Full sleeve fit' type='text'/>
                                    <input placeholder='Apply' type='submit' />
                                    <button onClick={handleCustomizationButtonClick} ><FontAwesomeIcon icon="fa-solid fa-xmark" /></button>
                                </div>
                                )}
                            </p>
                        </div>
                        <div className='padding-5 text-align-right'>
                            <span>
                                <button onClick={handleProductEditButtonClick} className='edit-product-btn'>
                                    <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" />
                                </button>
                            </span>
                            {isProductEditPopupOpen && (
                                // Popup content goes here
                                <div className="edit-product-popup">
                                    <p>Remove from cart</p>
                                    <p>Move to wishlist</p>
                                    <button onClick={handleProductEditButtonClick} className='edit-product-btn'><FontAwesomeIcon icon="fa-solid fa-xmark" /></button>
                                </div>
                            )}
                            <p>INR 459.00</p>
                        </div>
                    </div>
                    <hr />

                    <div className='cart-subtotal-container'>
                        <div className='d-flex jc-space-btw al-item-cen'>
                            <p>Subtotal <small>&#40;including tax&#41;</small>:</p>
                            <p>848.00</p>
                        </div>
                        <div className='d-flex jc-space-btw al-item-cen'>
                            <p>Delivery charge:</p>
                            <p>60.00</p>
                        </div>
                        <hr />

                        <div className='mt-2'></div>
                        <button onClick={handleButtonClick} className='promo-btn'>Add promo code / Giftcard</button>
                        {isPopupOpen && (
                            // Popup content goes here
                            <div className="popup">
                                <div className='pt-2' ></div>
                                <input placeholder='Enter promocode' type='text'/>
                                <input placeholder='Apply' type='submit' />
                                <button onClick={handleButtonClick}><FontAwesomeIcon icon="fa-solid fa-xmark" /></button>
                            </div>
                        )}
                    </div>

                    <div className='cart-total-container'>
                        <div className='d-flex jc-space-btw al-item-cen'>
                            <p className='f-size-1 f-weight-600 '>Total</p>
                            <p className='f-size-1 f-weight-600 '><small>INR </small>999.00</p>
                        </div>
                        <button className='btn'>Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
    
export default Cart;
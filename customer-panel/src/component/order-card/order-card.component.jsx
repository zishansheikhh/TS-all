import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './order-card.styles.css'

const OrderCard = ({sellerName, sellerLocation, orderDetails}) => {
    const {payload, date, status} = orderDetails
    return (
        <div className='order-cards-container'>
                <div className="order-card">
                    <div className="order-seller-info">
                        <div className='order-seller-image'>
                            <img />
                        </div>
                        <div className="order-seller-name-and-location">
                            <span className='order-seller-name'>{ sellerName.substring(0, 14) + '...' }</span>
                            <span className="order-seller-location">{sellerLocation}</span>
                            <span className="order-seller-location">7 hours</span>
                        </div>
                        <span className='order-delivery-status'>{status}</span>
                    </div>
                    <div className="order-quantity-container">
                        {
                            payload.map((item) => {
                                return <div className='order-name'><span className='order-quantity'>{item.quantity}</span>{`x ${item.product}`}</div>
                            })
                        }
                    </div>
                    <div className="order-other-info">
                        <div className='order-date'>{date}</div>
                        <div className='reorder-button'>
                        <FontAwesomeIcon icon="fa-solid fa-arrow-rotate-left" size='xs'/>
                            <span className='pl-1'>Reorder</span>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default OrderCard;
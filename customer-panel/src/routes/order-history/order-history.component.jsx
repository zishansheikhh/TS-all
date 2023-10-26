import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
// import OrderCard from '../../component/order-card/order-card.component';
// import SearchBox from '../../../component/customer-panel-components/search-box/search-box.component';

import './order-history.styles.css'

// import { Orders, SellerList } from '../../../data';

const OrderHistory = () => {
    return (
        <div className='w-90 m-auto'>
            <div className='mt-2'>
                <Link to='/user-profile'>
                    <FontAwesomeIcon icon="fa-solid fa-arrow-left-long" size='xl'/>
                </Link>
                <span className='f-size-1 ml-2'>Order History</span>
            </div>
            {/* <SearchBox /> */}
            {/* {
                Orders.map((order) => {
                    let sellerName, sellerLocation;
                    for (let i = 0; i < SellerList.length; i++) {
                        if (SellerList[i].id === order.sellerId) {
                            sellerName = SellerList[i].name
                            sellerLocation = SellerList[i].location
                        }
                    }
                    return <OrderCard key={order.id} sellerName={sellerName} sellerLocation={sellerLocation} orderDetails={order} />
                })
            } */}
        </div>
    )
}


export default OrderHistory;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import OrderIcon from '../../assets/interface-icons/box-open.svg';
import AddressIcon from '../../assets/interface-icons/house-building.svg';
import RefundIcon from '../../assets/interface-icons/arrows-repeat.svg';
import ContactIcon from '../../assets/interface-icons/messages.svg';
import StoreIcon from '../../assets/interface-icons/store-alt.svg';
import FaqIcon from '../../assets/interface-icons/message-question.svg';
import TermsIcon from '../../assets/interface-icons/memo-pad.svg';
import FeedbackIcon from '../../assets/interface-icons/message-arrow-up.svg';

import './account.styled.css';
import { Link } from 'react-router-dom';

const UserAccount = () => {

    return (
        <div>
            <div className="page-navigation-bar">
                <h2 className="ml-2 default-header"><Link to='/'><FontAwesomeIcon icon="fa-solid fa-arrow-left-long" /></Link> &nbsp;My Account</h2>
            </div>
            <div className='container-fluid m-auto'>
                <div className='profile-bg-container d-flex jc-center fd-col al-item-cen mt-3'>
                    <span><FontAwesomeIcon icon="fa-solid fa-user" /></span>
                    <p>Zishan Sheikh</p>
                    <p>zishansheikh@gmail.com</p>
                    <p>+91 7566699108</p>
                </div>
                <div className='profile-menu-items'>
                    <ul>
                        <li><img src={OrderIcon} alt='Orders' /><Link to='/'>My Orders</Link></li>
                        <li><img src={AddressIcon} alt='Address' /><Link to='/'>Saved Address</Link></li>
                        <li><img src={RefundIcon} alt='Refund' fj/><Link to='/'>Alterations and Refunds</Link></li>
                        <li><img src={ContactIcon} alt='Contact' /><Link to='/'>Contact Us</Link></li>
                        <li><img src={StoreIcon} alt='Store' /><Link to='/'>Stores Near You</Link></li>
                        <li><img src={FaqIcon} alt='Faq' /><Link to='/'>FAQs</Link></li>
                        <li><img src={TermsIcon} alt='Terms' /><Link to='/'>Terms and Conditions</Link></li>
                        <li><img src={FeedbackIcon} alt='Feedback' /><Link to='/'>Leave a Feedback for us</Link></li>
                    </ul>
                </div>
                <div className='pb-4 mb-5'></div>
            </div>
        </div>
    )
}
    
export default UserAccount;
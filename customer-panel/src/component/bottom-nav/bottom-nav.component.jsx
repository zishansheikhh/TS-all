import { Link } from 'react-router-dom';
import { useState } from 'react'
import Modal from 'react-modal';

import TSScanIcon from '../../assets/ts-scan-icon.png'
import HomeIcon from '../../assets/interface-icons/house-blank.svg'
import StoreIcon from '../../assets/interface-icons/store-alt.svg'
import CartIcon from '../../assets/interface-icons/cart-minus.svg'
import UserIcon from '../../assets/interface-icons/circle-user.svg'
import './bottom-nav.styles.css'

Modal.setAppElement('#root');

const BottomNav = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [cameraPermissionAccepted, setCameraPermissionAccepted] = useState(false);
    const [cameraOpen, setCameraOpen] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
  
    const openModal = () => {
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
      setCameraPermissionAccepted(false);
      setCameraOpen(false);
      setCapturedImage(null);
    };
  
    const handlePermissionAccept = () => {
      setCameraPermissionAccepted(true);
    };
  
    const handleCameraOpen = () => {
      setCameraOpen(true);
    };
  
    const handleCapture = (imageData) => {
      // Here, you can implement logic to store the captured image data in your database
      setCapturedImage(imageData);
      // For this example, we're just logging the image data
      console.log('Captured Image:', imageData);
      closeModal(); // Close the modal after capturing
    };

    

    return (
        <div className='bottom-nav-container'>
            <div className='bottom-nav-order'>
                <Link to='/'><img className='bottom-icons' src={HomeIcon} alt='Trend Stitchers Home'/></Link>
            </div>
            <div className='bottom-nav-history'>
                <Link to='/collection-page'><img className='bottom-icons' src={StoreIcon} alt='Trend Stitchers Collection'/></Link>
            </div>
            <div className='ts-scanicon'>
                <div onClick={openModal}><img className='ts-scanicon' src={TSScanIcon} alt='TS Scan Icon'/></div>
            </div>
            <div className='bottom-nav-order'>
                <Link to='/cart'><img className='bottom-icons' src={CartIcon} alt='Trend Stitchers cart'/></Link>
            </div>
            <div className='bottom-nav-order'>
                <Link to='/user-profile'><img className='bottom-icons' src={UserIcon} alt='Trend Stitchers user profile'/></Link>
            </div>

            {/* Modal */}
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className='scanmodel'>
                    {cameraPermissionAccepted ? (
                    cameraOpen ? (
                        <div>
                        {/* Camera component */}
                        <h2>Camera Component</h2>
                        {/* Replace this with your actual camera component */}
                        <button onClick={() => handleCapture('capturedImageData')}>
                            Capture
                        </button>
                        </div>
                    ) : (
                        <div>
                        {/* Info about camera permission */}
                        <h2>Camera Permission and Privacy</h2>
                        <p>Explanation about camera permission and privacy.</p>
                        <button onClick={handleCameraOpen}>Accept</button>
                        </div>
                    )
                    ) : (
                    <div>
                        {/* Initial content */}
                        <h2>TS Scan</h2>
                        <p>Click on the TS Scan icon to start.</p>
                        <button onClick={handlePermissionAccept}>Start</button>
                    </div>
                    )}
                    <button onClick={closeModal}>Close</button>
                </Modal>
        </div>
    )
}

export default BottomNav;
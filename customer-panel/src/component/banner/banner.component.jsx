import MobileBanner from '../../assets/sliders/mobile/img_banner-temp.jpg';
import DesktopBanner from '../../assets/sliders/top-banner.png';
// import SearchBox from '../search-box/search-box.component';

import './banner.styles.css';

const Banner = () => {
    return (
        <div>
            <div className="mobile-banner-container">
                <img className='banner' src={MobileBanner} alt='oxygen cylinder banner'/>
            </div>
            <div className="desktop-banner-container">
                <img className='banner' src={DesktopBanner} alt='oxygen cylinder banner'/>
            </div>
        </div>
        
    )
}

export default Banner;
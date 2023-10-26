import USPImg1  from '../../assets/measure-tape.svg';
import USPImg2  from '../../assets/needle.svg';
import USPImg3  from '../../assets/custom-fit.svg';
import USPImg4  from '../../assets/iphoneonhand.png';
import USPImg5  from '../../assets/measurement-gif.gif';

import './usp.styles.css';

const USP = () => {
    return (
        <div className='usp-container mb-4 theme-bg'>
            <img src={USPImg3} alt='Trend Stitchers USP' className='usp-svg' />
            <h4 className='light-text'>Custom Made</h4>
            <img src={USPImg2} alt='Trend Stitchers USP' className='usp-svg' />
            <h4 className='light-text'>Precise Stitching</h4>
            <img src={USPImg1} alt='Trend Stitchers USP' className='usp-svg' />
            <h4 className='light-text'>Finest Fabric</h4>
        </div>
    )
}

export default USP;
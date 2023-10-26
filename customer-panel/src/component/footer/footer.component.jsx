import React from 'react'
import { Link } from 'react-router-dom'

import TSLogo from '../../assets/ts-logo.png'

import './footer.styled.css'


const FooterSection= () => {
  return (
    <div>
        <div className='footer-container'>
            <div className='footer-wrapper'>
                <div>
                    <img src={TSLogo} alt='' />
                </div>
                <div>
                    <h2>Quick Links</h2>
                    <ul>
                        <li><Link to='/'>Men's</Link></li>
                        <li><Link to='/'>Women's</Link></li>
                        <li><Link to='/'>Bitmoji</Link></li>
                        <li><Link to='/'>Fandom</Link></li>
                    </ul>
                </div>
                <div>
                    <h2>Policies</h2>
                    <li><Link to='/'>Privacy Policy</Link></li>
                    <li><Link to='/'>Terms and Conditions</Link></li>
                    <li><Link to='/'>Refunds and Alteration</Link></li>
                    <li><Link to='/'>Scanning Privacy</Link></li>
                </div>
                <div>
                    <p>Get 40% discount coupon</p>
                    <input placeholder='Enter your email' type='email' />
                    <button className=''>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FooterSection;
import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useContext, useEffect, useState } from "react";
import MainLogo from '../../assets/ts-logo.png'
// import { GlobalContext } from "@/context/global.context";

import './topbar.styles.css';

const AdminTopbar = () => {

  return (
    <div>
        <div className='sidebar-container'>
            <div className='sidebar-wrapper'>
                <div>
                    <img src={MainLogo} alt='Trend Stitchers Logo' className='main-logo-xs' />
                </div>
                <ul>
                    <li><Link to='/'>Dashboard</Link></li>
                    <li><Link to='/'>Orders</Link></li>
                    <li><Link to='/'>Banners</Link></li>
                    <li><Link to='/'>Product Mngmt.</Link></li>
                    <li><Link to='/'>Enquiries</Link></li>
                    <li><Link to='/'>Members</Link></li>
                    <li><Link to='/'>Promotion</Link></li>
                    <li><Link to='/'>Reports</Link></li>
                    <li><Link to='/'>Feedback Surveys</Link></li>
                    <li><Link to='/'>Admin Mngmt.</Link></li>
                </ul>
            </div>
        </div>

        <div className="topbar-container">
            <div className='topbar-wrapper'>
                <div className='d-flex jc-space-btw al-item-cen'>
                    <div>
                        <h3>TS DASHBOARD</h3>
                    </div>
                    <div>
                        Zishan Sheikh
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AdminTopbar;

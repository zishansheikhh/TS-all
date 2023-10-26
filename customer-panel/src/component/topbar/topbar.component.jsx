import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from "react";
import Sidebar from './sidebar.component';
import MainLogo from '../../assets/ts-logo.png'
// import { GlobalContext } from "@/context/global.context";

import './topbar.styles.css';

const Topbar = () => {

  const [ isSidenavOpen, setIsSidenavOpen ] = useState(false)
  const sidebarToggle = () => {
    if (isSidenavOpen === false) {
      setIsSidenavOpen(true)
    }
    else {
      setIsSidenavOpen(false)
    }
  }

  return (
    <div>
      <div className="topbar-container">
        <div className='d-flex jc-flex-start al-item-cen'>
          <div>
            <img src={MainLogo} alt='Trend Stitchers Logo' className='main-logo-xs' />
          </div>
          <div className='ml-1'>
            <h3>TREND STITCHERS</h3>
            <p>STITCH YOUR OWN TREND</p>
          </div>
        </div>
        <div>
          <span className='cta-btn-text f-size-1 side-menu-icon' onClick={sidebarToggle} style={{cursor:'pointer'}}>
            <FontAwesomeIcon icon="fa-solid fa-bars" />
          </span>
        </div>
      </div>
      { isSidenavOpen && <Sidebar sidebarToggle={sidebarToggle} /> }
    </div>
  );
};

export default Topbar;

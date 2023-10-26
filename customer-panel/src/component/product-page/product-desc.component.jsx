import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import './product-page.styles.css';

const ProducDescription = () => {

    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (index) => {
      if (openDropdown === index) {
        setOpenDropdown(null);
      } else {
        setOpenDropdown(index);
      }
    };
  
    const getDropdownIcon = (index) => {
      return openDropdown === index ? faChevronDown : faChevronRight;
    };

    return (
        <div className="description-dropdown">
            <div className="dropdown-header" onClick={() => toggleDropdown(1)}>
                Fabric and Quality &nbsp;
                <FontAwesomeIcon icon={getDropdownIcon(1)} />
            </div>
            {openDropdown === 1 && (
                <p className="dropdown-content">Lorem ipsum</p>
            )}

            <div className="dropdown-header" onClick={() => toggleDropdown(2)}>
                Customization &nbsp;
                <FontAwesomeIcon icon={getDropdownIcon(2)} />
            </div>
            {openDropdown === 2 && (
                <p className="dropdown-content">Lorem ipsum</p>
            )}

            <div className="dropdown-header" onClick={() => toggleDropdown(3)}>
                Alterations and Refund &nbsp;
                <FontAwesomeIcon icon={getDropdownIcon(3)} />
            </div>
            {openDropdown === 3 && (
                <div>
                <p className="dropdown-content">
                    We offer 7 days hassle-free returns. Return Policies may vary based on products and promotions.
                </p>
                <ul>
                    <ol>Refunds for Prepaid orders would directly be initiated to source account and COD order will be refunded in the form of COUPON CODE ONLY</ol>
                    <ol>Defective Products, Wrong Products or Damaged Products issue should be raised within 24 hrs of delivery</ol>
                    <ol>All Orders wherein FREE Products included are not eligible for Return
                    For more details on our Returns Policies, please click here․</ol>
                </ul>
                </div>
            )}
        </div>
    )
}
    
export default ProducDescription;
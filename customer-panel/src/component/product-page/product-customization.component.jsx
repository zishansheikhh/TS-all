import CustomStyle1 from '../../assets/Tailor FIt.png'
import './product-page.styles.css';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const ProductCustomization = () => {

    return (
        <div className="customization-container">
            <div className="customization-options-wrapper">
                <div className='desktop-customization'>
                    <form>
                        <p>Choose your favourite fit</p>
                        <label>
                            <input type="radio" name="test" value="small"  defaultChecked />
                            <img src={CustomStyle1} alt="Option 1" />
                        </label>

                        <label>
                            <input type="radio" name="test" value="big" />
                            <img src={CustomStyle1} alt="Option 2" />
                        </label>
                    </form>
                    <form>
                        <p>Choose your sleeve size</p>
                        <label>
                            <input type="radio" name="test" value="small" defaultChecked />
                            <img src={CustomStyle1} alt="Option 1" />
                        </label>

                        <label>
                            <input type="radio" name="test" value="big" />
                            <img src={CustomStyle1} alt="Option 2" />
                        </label>
                    </form>
                </div>
            </div>
        </div>
    )
}
    
export default ProductCustomization;
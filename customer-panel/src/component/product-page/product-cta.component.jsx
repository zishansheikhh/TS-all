import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FitImg from '../../assets/interface-icons/GwStPmg.png';
import './product-page.styles.css';

const ProductCta = () => {
  const [modal, setModal] = useState(false);
  const [activeFieldset, setActiveFieldset] = useState(0); // Track the active fieldset

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleNext = () => {
    setActiveFieldset(activeFieldset + 1);
  };

  const handlePrevious = () => {
    setActiveFieldset(activeFieldset - 1);
  };

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  return (
    // <div>
      <div className="product-page-cta-container d-grid">
        <div className="customization-modal">
          <div onClick={toggleModal} className="btn scan-button">
            Find your Size
          </div>
          {/* modal content */}
          {modal && (
            <div className="modal">
              <button onClick={toggleModal} className="overlay"></button>
              <div className="modal-content">
                <button className="close-modal" onClick={toggleModal}>
                  <FontAwesomeIcon icon={['fa-solid', 'xmark']} />
                </button>
                <h4 id="heading">Let's get your perfect fit</h4>
                <p>Enter your body parameters and we'll find the size that fits you best</p>
                <form action="/customization/" id="msform">
                  <ul id="progressbar">
                    <li className={activeFieldset === 0 ? "active" : ""} id='basic-info' ></li>
                    <li className={activeFieldset === 1 ? "active" : ""} id='scan-info' ></li>
                    <li className={activeFieldset === 2 ? "active" : ""} id='body-param' ></li>
                    <li className={activeFieldset === 3 ? "active" : ""} id='body-fit' ></li>
                    <li className={activeFieldset === 4 ? "active" : ""} id='body-fit-xtra' ></li>
                    <li className={activeFieldset === 5 ? "active" : ""} id='cloth-fit' ></li>
                    <li className={activeFieldset === 6 ? "active" : ""} id='submit-form' ></li>
                  </ul>
                  {activeFieldset === 0 && (
                  <fieldset> 
                      <label className="fieldlabels"></label> <input type="number" name="height" placeholder="Height in CM*" required />
                      <label className="fieldlabels"></label> <input type="number" name="weight" placeholder="Weight in KG*" required />
                      <label className="fieldlabels"></label> <input type="number" name="age" min="16" max="55" placeholder="Age" />
                      <div className="input-field customization-dropdown">
                          <select className="gender-dropdown">
                              <option defaultValue="" disabled selected>Choose your gender</option>
                              <span className="material-symbols-rounded">male</span><option defaultValue="male">Male</option>
                              <span className="material-symbols-rounded">female</span><option defaultValue="female">Female</option>
                          </select>
                      </div>
                      <input 
                        type="button" 
                        name="next" 
                        className="next 
                        action-button" 
                        defaultValue="Next" onClick={handleNext}  
                      />
                  </fieldset>
                  )}
                  {activeFieldset === 1 && (
                  <fieldset>
                      <label className="fieldlabels">Scan your measurement</label><input type="file" name="pic" accept="image/*" capture="camera" />
                      <input type="button" defaultValue="Skip" />
                      <input type="button" name="next" className="next action-button" defaultValue="Next" onClick={handleNext}  /> <input type="button" name="previous" className="previous action-button-previous" defaultValue="Previous" onClick={handlePrevious} />
                  </fieldset>
                  )}
                  {activeFieldset === 2 && (
                  <fieldset>
                      <p>Body type</p>
                      <div className="body-figure-fit">
                          <label><input name="BodyFit" type="radio" id="Thin" /><span></span>Thin</label>
                          <label><input name="BodyFit" type="radio" id="Rectangle" /><span></span>Rectangle</label>
                          <label><input name="BodyFit" type="radio" id="Inverted" /><span></span>Inverted</label>
                          <label><input name="BodyFit" type="radio" id="Oval" /><span></span>Oval</label>
                      </div>
                      <input type="button" name="next" className="next action-button" defaultValue="Next" onClick={handleNext}  /> <input type="button" name="previous" className="previous action-button-previous" defaultValue="Previous" onClick={handlePrevious} />
                  </fieldset>
                  )}
                  {activeFieldset === 3 && (
                  <fieldset>
                      <p>Hip and Belly type</p>
                      <div className="body-figure-fit">
                          <label><input name="BellyHip" type="radio" id="CurveB" /><span></span>Curve belly</label>
                          <label><input name="BellyHip" type="radio" id="Average" /><span></span>Average</label>
                          <label><input name="BellyHip" type="radio" id="FlatB" /><span></span>Flat hips</label>
                      </div>
                      <input type="button" name="next" className="next action-button" defaultValue="Next" onClick={handleNext}  /> <input type="button" name="previous" className="previous action-button-previous" defaultValue="Previous" onClick={handlePrevious} />
                  </fieldset>
                  )}
                  {activeFieldset === 4 && (
                  <fieldset>
                      <p>Your measurements(Editable):</p>
                      <section>
                      <label className="fieldlabels">Neck</label> <input type="text" name="E_Neck" defaultValue="20" /> 
                      </section>
                      <section>
                      <label className="fieldlabels">Shoulder</label> <input type="text" name="E_Shoulder" defaultValue="38" /> 
                      </section>
                      <section>
                      <label className="fieldlabels">chest</label> <input type="text" name="E_Chest" defaultValue="40" /> 
                      </section>
                      <section>
                      <label className="fieldlabels">Waist</label> <input type="text" name="E_Waist" defaultValue="38" /> 
                      </section>
                      <section>
                      <label className="fieldlabels">Hip</label> <input type="text" name="E_Hip" defaultValue="40" />
                      </section>
                      <section> 
                      <label className="fieldlabels">Arm</label> <input type="text" name="E_Arm" defaultValue="28" />
                      </section>
                      <input type="button" name="next" className="next action-button" defaultValue="Next" onClick={handleNext}  /> <input type="button" name="previous" className="previous action-button-previous" defaultValue="Previous" onClick={handlePrevious} />
                  </fieldset>
                  )}
                  {activeFieldset === 5 && (
                  <fieldset>
                  <p>Choose your fit</p>
                      <div className="body-figure-fit">
                          <label><input name="TShirtFit" type="radio" id="Tailor" /><span></span>Tailor Fit</label>
                          <label><input name="TShirtFit" type="radio" id="Regular" /><span></span>Regular Fit</label>
                          <label><input name="TShirtFit" type="radio" id="Regular" /><span></span>Relaxed Fit</label>
                          <label><input name="TShirtFit" type="radio" id="Oversized" /><span></span>Oversized</label>
                      </div>
                  <p>Neck</p>
                      <div className="body-figure-fit">
                          <label><input name="TNeck" type="radio" id="RNeck" /><span></span>Round</label>
                          <label><input name="TNeck" type="radio" id="VNeck" /><span></span>V-Neck</label>
                      </div>
                      <div className="OtherCustomization">
                          <p>Sleeve<br />
                          <label>
                              <input name="TSleeve" type="radio" style={{width:'15% !important'}} />
                              <span style={{paddingLeft:'15px !important'}} >Half</span>
                          </label>
                          <label>
                              <input name="TSleeve" type="radio" style={{width:'15% !important'}} />
                              <span style={{paddingLeft:'15px !important'}} >Full</span>
                          </label>
                          </p>
                          <p>Print<br />
                          <label>   
                              <input name="TPrint" type="radio" style={{width:'15% !important'}} />
                              <span style={{paddingLeft:'15px !important'}} >Front</span>
                          </label>
                          <label>
                              <input name="TPrint" type="radio" style={{width:'15% !important'}} />
                              <span style={{paddingLeft:'15px !important'}} >Back</span>
                          </label>
                          <label>
                              <input name="TPrint" type="radio" style={{width:'15% !important'}} />
                              <span style={{paddingLeft:'15px !important'}} >Pocket</span>
                          </label>
                          </p>
                      </div>
                      <input type="button" name="next" className="next action-button" defaultValue="Submit" onClick={handleNext} />
                  </fieldset>
                  )}
                  {activeFieldset === 6 && (
                  <fieldset>-
                    <div className="w-50 m-auto">
                      <h4 className="purple-text center-align">SUCCESS!</h4> <br />
                      <div className="  center-align">
                          <div> <img src={FitImg} alt="Fit confirm" className="fit-image" /> </div>
                      </div>
                    </div>
                    <br /><br />
                    <div>
                      <p className="purple-text text-center">We got your measurements. You can place your order now! </p>
                    </div>
                  </fieldset>
                  )}
                </form>
              </div>
            </div>
          )}
        </div>
        {/* checkout button */}
        <Link to="/checkout" className="btn checkout-button">
          Buy Now
        </Link>
      </div>
      // <div className="mt-4"><br /></div>
    // </div>
  );
};

export default ProductCta;
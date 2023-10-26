import { useState } from 'react';
import './account.styled.css';

const Loginregister = () => {

    const [isLoginVisible, setLoginVisible] = useState(true);
    const [isRegisterVisible, setRegisterVisible] = useState(false);
  
    const toggleLoginAndRegister = () => {
      setLoginVisible(!isLoginVisible);
      setRegisterVisible(!isRegisterVisible);
    };

    return (
        <div>
    <div className="container-fluid m-auto">
      <div className="login-form">
        {isLoginVisible && (
          <div>
            <h2 className='default-header'>Hi! Login to your account</h2>
            <form>
              <input placeholder="Phone number" type="number"></input>
              <input placeholder="Password" type="password"></input>
              <button className='btn'>Login</button>
              <div className='login-form-link' onClick={toggleLoginAndRegister}>Create new account</div>
            </form> 
          </div>
        )}

        {isRegisterVisible && (
          <div>
            <h2 className='default-header'>Create a new account</h2>
            <form>
                <input placeholder="Phone number" type="number"></input>
                <input placeholder="Email" type="email"></input>
              <input placeholder="Password" type="password"></input>
              <button className='btn'>Register</button>
              <div className='login-form-link' onClick={toggleLoginAndRegister}>Already have an account? Login</div>
            </form>
          </div>
        )}
      </div>
    </div>
        </div>
        )
}
        
export default Loginregister;
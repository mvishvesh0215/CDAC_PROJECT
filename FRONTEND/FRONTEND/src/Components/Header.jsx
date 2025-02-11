import React from 'react';
import '../Style/Header.css'
import logo from '../logo.png';
import { Link, useNavigate } from 'react-router-dom';
function Header() {
  const navigate=useNavigate()

  const handleSelect=(event)=>{
    const value=event.target.value;
    if(value){
      navigate(value)
    }
  }

  return (
    <div className='header'>
      <div className="logo">
        <Link to='/'><img src={logo} className="logoImg"alt="" /></Link>
      </div>
      <div className="subItems">
      <Link to="/About"><h5>About us</h5></Link>
        <Link to='/'><h5>Home</h5></Link>
        <Link to='/Contact'><h5>Contact us</h5></Link>
        <Link to='/safety'><h5>Safety instructions</h5></Link>
        <Link to='/faq'><h5>FAQ</h5></Link>
        <Link to='/login'><h5>Login</h5></Link>
        {/* <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onChange={handleSelect}>
          <option value="" disabled>Select an option</option>
          <option value="/register">Login</option>
          <option value="/AdminLogin">Admin Login</option>
        </select> */}
      </div>
    </div>
  )
}

export default Header

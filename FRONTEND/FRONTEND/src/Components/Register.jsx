import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../Style/register.css";
import { register } from "../services/user";

const Register = () => {
  const [userName,setUserName]=useState('');
  const [firstName,setFirstName]=useState('');
  const [lastName,setLastName]=useState('');
  const [dob,setDob]=useState('');
  const [phoneNo,setPhoneNo]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [aadharCard,setAadharCard]=useState('');
  const [panCard,setPanCard]=useState('');
  const [role,setRole]=useState('');
  const [address, setAddress] = useState({
    state: "",
    address: "",
    pinCode: "",
    city: "",
  });

  const onRegister = async () => {
    if (role.length == 0) {
      toast.warning('Please enter role')
    }else if (userName.length == 0) {
      toast.warning('Please enter user name')
    }else if (firstName.length == 0) {
      toast.warning('Please enter first name')
    } else if (lastName.length == 0) {
      toast.warning('Please enter last name')
    }else if (dob.length == 0) {
      toast.warning('Please enter date of birth')
    }else if (phoneNo.length == 0) {
      toast.warning('Please enter phone')
    }else if (email.length == 0) {
      toast.warning('Please enter email')
    }else if (password.length == 0) {
      toast.warning('Please enter password')
    } else if (aadharCard.length == 0) {
      toast.warning('Please enter Aadhar Card No.')
    }else if (panCard.length == 0) {
      toast.warning('Please enter PAN Card No.')
    }else if (address.state.length == 0) {
      toast.warning('Please enter State')
    }else if (address.city.length == 0) {
      toast.warning('Please enter City')
    }else if (address.address.length == 0) {
      toast.warning('Please enter address')
    }else if (address.pinCode.length == 0) {
      toast.warning('Please enter pinCode')
    }else {
      // call register function to consume register API
      const result = await register(userName,firstName,lastName,dob,phoneNo,email,password,aadharCard,panCard,role,address)
      console.log(result)
      if (result.message == 'success') {
        toast.success('Successfully registered user')

        // dynamic navigation
        // navigate to login component
        navigate('/login')
      } else {
        toast.error(result['error'])
      }
     }
  }

  const navigate = useNavigate();

  

  return (
    <div className="registration-page">
      <div className="container1 d-flex justify-content-center">
        <div className="card p-4 w-100">
          <div>⚠️ Please ensure all details are accurate before submitting." </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="register-container h-100 d-flex justify-content-center align-items-center">
        <div className="card p-4 w-100">
          <h3 className="text-center mb-4">Register</h3>
              <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                className="form-control"
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value.toUpperCase(  ))}
              >
                <option value="" disabled>Select Role</option>
                <option value="ROLE_VENDOR">VENDOR</option>
                <option value="ROLE_CUSTOMER">CUSTOMER</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="userName">User Name</label>
              <input
                type="text"
                className="form-control"
                id="userName"
                name="userName"  // Added name attribute
                onChange={(e)=>setUserName(e.target.value)}
                placeholder="Enter user name"
                
              />
            </div>
            <div className="form-group">
              <label htmlFor="userName">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"  // Added name attribute
                onChange={(e)=>setFirstName(e.target.value)}
                placeholder="Enter user name"
                
              />
            </div>
            <div className="form-group">
              <label htmlFor="userName">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"  // Added name attribute
                onChange={(e)=>setLastName(e.target.value)}
                placeholder="Enter user name"
                
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Date Of Birth</label>
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"  // Added name attribute
                onChange={(e)=>setDob(e.target.value)}
                
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="number"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"  // Added name attribute
                onChange={(e)=>setPhoneNo(e.target.value)}
                placeholder="Enter your mobile number"
                
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">State</label>
              <input
                type="text"
                className="form-control"
                id="state"
                name="address"  // Added name attribute
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                placeholder="Enter your address"
                
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">City</label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="address"  // Added name attribute
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                placeholder="Enter your address"
                
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"  // Added name attribute
                onChange={(e) => setAddress({ ...address, address: e.target.value })}
                placeholder="Enter your address"
                
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"  // Added name attribute
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Enter your email"
                
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"  // Added name attribute
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Enter your password"
                
              />
            </div>

            <div className="form-group">
              <label htmlFor="aCard">Aadhar Card</label>
              <input
                type="number"
                className="form-control"
                id="aCard"
                name="aCard"  // Added name attribute
                onChange={(e)=>setAadharCard(e.target.value)}
                placeholder="Enter your Aadhar card number"
                
              />
            </div>

            <div className="form-group">
              <label htmlFor="pCard">PAN Card</label>
              <input
                type="text"
                className="form-control"
                id="pCard"
                name="pCard"  // Added name attribute
                onChange={(e)=>setPanCard(e.target.value)}
                placeholder="Enter your PAN card number"
                
              />
            </div>

            <div className="form-group">
              <label htmlFor="pinCode">Pin Code</label>
              <input
                type="number"
                className="form-control"
                id="pinCode"
                name="pinCode"  // Added name attribute
                onChange={(e)=>setAddress({...address,pinCode:e.target.value})}
                placeholder="Enter your pin code"
                
              />
            </div>

           
            <button onClick={onRegister} className="btn btn-primary btn-block">
              Register
            </button>
        </div>
      </div>
    </div>
  );
};

export default Register;

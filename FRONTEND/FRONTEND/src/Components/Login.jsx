import React, { useState } from "react";
import '../Style/login.css'
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/user";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [formData, setFormData] = useState({
  //   username: "",
  //   password: "",
  // });

  // get navigate function reference
  const navigate=useNavigate()

  const onLogin = async () => {
    // client side validation
    if (email.length === 0) {
      toast.warning('Please enter email')
    } else if (password.length === 0) {
      toast.warning('Please enter password')
    } else {
      // call the login api and get the result
      console.log(email);
      console.log(password);
      const result = await login(email, password)
        console.log(result)
        const {message}=result.serviceResp.apiResponse
        const{id,userRole,userName}=result.serviceResp.responseUserDto
        console.log(userRole)
      // check if the result is successful
      if (message === 'SuccessFull Login...') {
        // read the token from data
        const data = result['userDto']
        const token = result.jwt

        // cache user token
        sessionStorage['jwt'] = token
        sessionStorage.setItem("userId",id)
        sessionStorage.setItem("role",userRole)
        sessionStorage.setItem("userName",userName)
        // redirect to todo item list
        if(userRole==="ROLE_VENDOR"){
          console.log("hi")
          navigate('/vendor')
        }else if(userRole==="ROLE_CUSTOMER"){
          console.log("hey")
          navigate('/customer')
        }
      }else {
        toast.error(result['error'])
      }
    }
  }


  return (
    <div className="login-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f8f9fa" }}>
      <div style={{ width: "300px", padding: "20px", borderRadius: "8px", backgroundColor: "white", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
        <ToastContainer position="top-center" autoClose={3000} />
        <h3 className="text-center mb-4">Login</h3>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="text"
              id="email"
              className="form-control"
              placeholder="Enter your Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button onClick={onLogin} className="btn btn-primary w-100">Login</button>
            <Link to='/register'><label htmlFor="password" className="form-label">New user? Register</label></Link>
      </div>
    </div>
  );
}

export default Login;
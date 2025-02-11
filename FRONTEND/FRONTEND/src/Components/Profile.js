import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { getProfile, updateProfile } from '../services/customer';
import { updateVendorProfile } from '../services/vendor';

function Profile() {
      const [firstName,setFirstName]=useState('');
      const [lastName,setLastName]=useState('');
      const [phoneNo,setPhoneNo]=useState('');
      const [password,setPassword]=useState('');
      const [address, setAddress] = useState({
        state: "",
        address: "",
        pinCode: "",
        city: "",
      });

      const id=sessionStorage.getItem("userId")
      console.log(id)
      const userRole=sessionStorage.getItem("role")
    //   first_name,
    //   last_name,
    //   phone_no,
    //   password,
    //   address,
    //   city,
    //   state,
    //   pincode
      const handleUpdate=async()=>{
        if(userRole==="ROLE_VENDOR"){
          const update=await updateVendorProfile(firstName,lastName,phoneNo,password,
            address.address,address.city,address.state,address.pinCode,id)
            console.log(update)
        }else if(userRole==="ROLE_CUSTOMER"){
          const update=await updateProfile(firstName,lastName,phoneNo,password,
            address.address,address.city,address.state,address.pinCode,id)
            console.log(update)
        }
            
      }

    useEffect(()=>{
     const onLoadProfile=async()=>{
        const result=await getProfile(id)
        console.log(result)
        if (result.status === "success") {
            // Extract data and update state
            const { first_name, last_name, phone_no } = result.data.user;
            const { address, city, pincode, state } = result.data.address;
    
            setFirstName(first_name);
            setLastName(last_name);
            setPhoneNo(phone_no);
            setAddress({
              state,
              address,
              pinCode: pincode,
              city,
            });
          } else {
            toast.error(result.error || "Failed to load profile");
          }
     }  
     onLoadProfile() 
    },[id])
  return (
    <div className='container-fluid vh-90 d-flex justify-content-center align-items-center'>
      <ToastContainer position="top-center" autoClose={3000} />
        <div className="card p-4 w-75 ">
            <div className="form-group">
              <label htmlFor="userName">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"  // Added name attribute
                onChange={(e)=>setFirstName(e.target.value)}
                value={firstName}
                
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
                value={lastName}
                
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
                value={phoneNo}
                
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
                value={address.state}
                
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
                value={address.city}
                
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
                value={address.address}
                
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
                value={password}
                
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
                value={address.pinCode}
                
              />
            </div>
            <button onClick={handleUpdate} className="btn btn-success btn-block">
              Update
            </button>
        </div>

    </div>
  )
}

export default Profile
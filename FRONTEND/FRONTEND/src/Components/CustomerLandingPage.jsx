import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { getLocalVendors, getSubscriptionsOfVendor } from '../services/customer'
import VendorSubscriptions from './VendorSubscriptions'
import { getSubscriptions } from '../services/vendor'

function CustomerLandingPage() {
    const[vendors,setVendors]=useState([])
    const [boughtSubscription,setBoughtSubscription]=useState([])
    const customerId = sessionStorage.getItem("userId")
    const location = useLocation()
    const navigate = useNavigate()

    const handleSelectVendor=(vendorId)=>{
        navigate(`vendor/subscriptions/${vendorId}`)
    }

    
    useEffect(() => {
      console.log('component is mounted...')
      const onLoadLocalVendors = async () => {
        // customerId = sessionStorage.getItem("userId")
        const result = await getLocalVendors(customerId)
      //  console.log(result.data.data)
        setVendors(result.data.data)
      //   if (response) {
      //       setVendors(response)
      //       toast.success("Vendor list")
      //   } else {
      //     toast.error(result['error'])
      //   }
      }
      onLoadLocalVendors()

      const onLoadSubscription = async () => {
    const result = await getSubscriptionsOfVendor(customerId);
        console.log(result)
    // if (result.success && result.data.length > 0) { 
    //   console.log("Purchased Subscriptions: ", result.data);
    //   setBoughtSubscription(result.data); 
    // } else {
    //   console.log("No subscriptions found.");
    //   setBoughtSubscription([]); // Set empty array if no subscriptions
    // }
  };
  onLoadSubscription();
    }, [customerId])

    

  return (
    <div className='container-fluid'>
        <div className='subsItem'>
        <ToastContainer position="top-right" autoClose={3000} />
         <h2 className='heading'>Local Vendors</h2>
         <table className='table table-hover'>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {vendors!=undefined&&vendors.map((vendor, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{vendor.first_name}</td>
                  <td>{vendor.last_name}</td>
                  <td>
                    <button onClick={()=>handleSelectVendor(vendor.id)} className='btn btn-warning'>Select</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CustomerLandingPage
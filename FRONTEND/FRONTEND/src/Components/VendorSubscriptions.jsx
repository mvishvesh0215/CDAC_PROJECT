import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { buySubscription, getVendorSubscriptions } from '../services/customer'
import { toast, ToastContainer } from 'react-toastify'

function VendorSubscriptions() {
    const[subscriptions,setSubscriptions]=useState([])
    // const location=useLocation()
    const navigate=useNavigate()
    const {vendorId}=useParams()
    const customerId=sessionStorage.getItem("userId")
   const handleOnBuy=async(rate,quantity,subId)=>{
    const result=await buySubscription(rate,quantity,customerId,subId)
    console.log(result)
    navigate('/customer')
   }

    
    useEffect(() => {
      console.log('component is mounted...')
      const onLoadVendorSubscriptions = async () => {
        const result = await getVendorSubscriptions(vendorId)
        console.log(result)
        if (result) {
            setSubscriptions(result.data.data)
            toast.success("Subscriptions by vendor")
        } else {
          toast.error(result['error'])
        }
      }
      onLoadVendorSubscriptions()
    
      return () => {
        // this function will get called when the component
        // gets unmounted (unloaded)
        console.log('component is unmounted...')
      }
    }, [])

  return (
    <div className='container-fluid'>
        <div className='subsItem'>
        <ToastContainer position="top-right" autoClose={3000} />
         <h2 className='heading'>Plans Available</h2>
         <table className='table table-hover'>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Price/unit</th>
              <th>Unit Quantity</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((subscription, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{subscription.subscription_name}</td>
                  <td>{subscription.unit_price}</td>
                  <td>{subscription.minimum_quantity}</td>
                  <td>
                    <button onClick={()=>handleOnBuy(subscription.unit_price,subscription.minimum_quantity,subscription.id)} 
                    className='btn btn-danger'>Buy</button>
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

export default VendorSubscriptions
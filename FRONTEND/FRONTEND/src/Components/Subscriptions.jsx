import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { getSubscriptions } from '../services/vendor'
import { useLocation } from 'react-router-dom'

function Subscriptions() {
    const[subscriptions,setSubscriptions]=useState([])
    const vendorId=sessionStorage.getItem("userId")
    const location=useLocation()

    const onLoadSubscriptions = async () => {
      const result = await getSubscriptions(vendorId)
      const response=result.data
      console.log(response)
      if (response) {
        toast.success("Subscription list")
          setSubscriptions(response)
      } else {
        toast.error(result['error'])
      }
    }
    useEffect(() => {
      console.log('component is mounted...')
      onLoadSubscriptions()
    
      return () => {
        // this function will get called when the component
        // gets unmounted (unloaded)
        console.log('component is unmounted...')
      }
    }, [location])

  return (
    <div className='container-fluid'>
        {subscriptions.length!=0&&(
            <div className='subsItem'>
            <ToastContainer position="top-right" autoClose={3000} />
             <h2 className='heading'>Subscriptions</h2>
             <table className='table table-hover'>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Price per unit</th>
                  <th>Units</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((subscription, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{subscription.subscriptionName}</td>
                      <td>{subscription.unitPrice}</td>
                      <td>{subscription.minimumQuantity}</td>
                      <td></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
        {subscriptions.length==0&&(
           <div className='subsItem'>
           <ToastContainer position="top-right" autoClose={3000} />
            <h2 className='heading'>Nothing to show here</h2>
         </div>
        )}
    </div>
  )
}

export default Subscriptions
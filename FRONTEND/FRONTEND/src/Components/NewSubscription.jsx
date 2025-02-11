import React, { useState } from 'react'
import '../Style/newSubscription.css'
import "react-toastify/dist/ReactToastify.css";
import { createSubscription } from '../services/vendor'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom';


function NewSubscription() {
    const[subscriptionName,setSubscriptionName]=useState('')
    const[rate,setRate]=useState('')
    const[units,setUnits]=useState('')
    const vendorId=sessionStorage.getItem("userId")

    const navigate=useNavigate()

    const handleCreate=async()=>{
        if (subscriptionName.length === 0) {
              toast.warning('Please enter name of the subscription')
            } else if (rate.length === 0) {
              toast.warning('Please enter the price of the unit')
            }else if (units.length === 0) {
                toast.warning('Please enter the unit')
              }  else{
                const result=await createSubscription(vendorId,subscriptionName,rate,units)
                console.log(result)
                toast.success('Subscription Created!!')
                navigate('/vendor/subscriptions',{ state: { refresh: true } })
            }
    }
  return (
    <div className='container-fluid'>
      <div className='subsItem'>
        <ToastContainer position="top-right" autoClose={3000} />
             <h2 className='heading'>New Subscription</h2>
        <div className='childItem'>
          <label htmlFor=''>Name of the Subscription</label>
          <input
            onChange={(e) => setSubscriptionName(e.target.value)}
            type='text'
            className='form-control-md'
          />
        </div>
        <div className='childItem'>
          <label htmlFor=''>Price per unit</label>
          <input
            onChange={(e) => setRate(e.target.value)}
            type='text'
            className='form-control-sm'
          />
        </div>
        <div className='childItem'>
          <label htmlFor=''>Units</label>
          <input
            onChange={(e) => setUnits(e.target.value)}
            type='text'
            className='form-control-md'
          />
        </div>
        <button onClick={handleCreate} className="btn btn-success w-100">Create</button>
      </div>
  </div>
  )
}

export default NewSubscription
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { getCustomers } from '../services/vendor'

function CustomerTable() {

  const[customers,setCustomers]=useState([])
    const vendorId=sessionStorage.getItem("userId")
    const location=useLocation()

    
    useEffect(() => {
      const onLoadCustomers = async () => {
        const result = await getCustomers(vendorId)
        console.log(result)
        if (result) {
            setCustomers(result)
            toast.success("Customers list")
        } else {
          toast.error(result['error'])
        }
      }
      onLoadCustomers()
    }, [location])

  return (
    <div className='container-fluid'>
      <div className='subsItem'>
        <ToastContainer position="top-right" autoClose={3000} />
         <h2 className='heading'>Customers</h2>
         <table className='table table-hover'>
          <thead>
            <tr>
              <th>No.</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone no</th>
              <th>Email</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {customers.length!=0 && customers.map((customer, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{customer.firstName}</td>
                  <td>{customer.lastName}</td>
                  <td>{customer.phoneNo}</td>
                  <td>{customer.email}</td>
                  <td>{customer.address.city}</td>
                  <td></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CustomerTable
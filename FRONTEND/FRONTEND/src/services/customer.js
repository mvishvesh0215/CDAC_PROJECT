import axios from "axios"
import { createUrl } from "../utils"
import { createExpressUrl } from "../utils2"

function getAuthHeaders() {
    const token = sessionStorage.getItem('jwt'); // Ensure token is stored
    return {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
}

export async function getLocalVendors(customerId){
    try{
    const url = createExpressUrl('customer/all-vendor')
    const response = await axios.get(url, {
        headers: getAuthHeaders(),
        params: { customer_id: customerId }
    });
    console.log(response)
    return response
  } catch (ex) {
    return { status: 'error', error: ex }
    }
}
export async function getVendorSubscriptions(vendorId){
    try{
    const url = createExpressUrl('customer/all-subscription')
    const response = await axios.get(url, {
        headers: getAuthHeaders(),
        params: { vendor_id: vendorId }
    });
    return response
  } catch (ex) {
    return { status: 'error', error: ex }
    }
}
export async function buySubscription(buy_price, quantity, customer_id, subscription_id){
    try {
        const url = createExpressUrl('customer/buy-subscription')
        const body = {
            buy_price, quantity, customer_id, subscription_id
        }
        const response = await axios.post(url, body,{ headers: getAuthHeaders() })
        return response
      } catch (ex) {
        return { status: 'error', error: ex }
      }
}
export async function getSubscriptionsOfVendor(customerId){
    try {
        const url = createExpressUrl(`customer/subscription`); // Ensure correct API endpoint
        console.log(url)
        
        const response = await axios.get(url, {
            headers: getAuthHeaders(),
            params: { customer_id: customerId }
        });
        console.log(response)
        return response.data; // Return only the response data
    } catch (ex) {
        return { status: 'error', error: ex.message };
    }
}
export async function getProfile(customerId){
    try {
        const url = createExpressUrl(`customer/profile`); // Ensure correct API endpoint
        const response = await axios.get(url, {
            headers: getAuthHeaders(),
            params: { customer_id: customerId }
        });
        return response.data; // Return only the response data
    } catch (ex) {
        return { status: 'error', error: ex.message };
    }
}
export async function updateProfile(first_name,last_name,phone_no,password,address,city,state,pincode,id){
    try {
        const url = createExpressUrl(`customer/profile`); // Ensure correct API endpoint
        const body={
        first_name,
        last_name,
        phone_no,
        password,
        address,
        city,
        state,
        pincode
        }
        const response = await axios.put(url,body,{
            headers: getAuthHeaders(),
            params: { customer_id: id },
        });
        return response.data; // Return only the response data
    } catch (ex) {
        return { status: 'error', error: ex.message };
    }
    }


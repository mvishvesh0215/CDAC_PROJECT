import axios from 'axios'
import { createUrl } from '../utils'

function getAuthHeaders() {
    const token = sessionStorage.getItem('jwt'); // Ensure token is stored
    return {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
}

export async function getCustomers(vendorId){
    try{
    const url = createUrl('vendor/list-of-customer/'+vendorId)
    const response=await axios.get(url, { headers: getAuthHeaders() })
    if (Array.isArray(response.data)) {
        return response.data; // Correct format
    } else {
        return []; // Handle unexpected non-array response
    }
  } catch (ex) {
    return []
    }
}

export async function createSubscription(vendorId,subscriptionName,unitPrice,minimumQuantity){
    try{
        const url = createUrl('vendor/create-new-subscription/'+vendorId)
        const body={
            subscriptionName,unitPrice,minimumQuantity
        }
    const response=axios.post(url,body,{ headers: getAuthHeaders() })
    return response.data
    }catch (ex) {
        return { status: 'error', error: ex }
        }
}
export async function getSubscriptions(vendorId){
    try{
    const url = createUrl('vendor/list-of-subscription/'+vendorId)
    const response=axios.get(url,{ headers: getAuthHeaders() })
    return response
  } catch (ex) {
    return { status: 'error', error: ex }
    }
}
export async function updateVendorProfile(first_name,last_name,phone_no,password,address,city,state,pincode,id){
    try{
        const url = createUrl('vendor/update-vendor-details/'+id)
        const body={
            first_name,last_name,phone_no,password,address,city,state,pincode
        }
    const response=axios.put(url,body,{ headers: getAuthHeaders() })
    return response.data
    }catch (ex) {
        return { status: 'error', error: ex }
        }
}
export async function getVendorProfile(vendorId){
    try {
        const url = createUrl(`customer/profile/${vendorId}`); // Ensure correct API endpoint
        const response = await axios.get(url,{ headers: getAuthHeaders() });
        return response.data; // Return only the response data
    } catch (ex) {
        return { status: 'error', error: ex.message };
    }
}
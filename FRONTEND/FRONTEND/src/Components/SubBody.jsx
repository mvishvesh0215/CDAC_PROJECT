import React from 'react'
import '../Style/SubBody.css'
import pipe5 from '../pipe5.jpeg';
function SubBody() {
  return (
    <div className='sub'>
        <div className='Left'>
            <h1>Apocalypse Gas Pipelines</h1>
            {/* <div className="left"> */}
            <p>
            The Online Pipelined Gas Users Billing Application is a streamlined and efficient platform designed for gas service providers and consumers to manage billing, payments, and usage tracking with ease. 
            It offers automated invoice generation, real-time usage monitoring, secure online payments, and customer account management. Built for accuracy and convenience, the system ensures transparent billing, reduces manual errors, and enhances the overall user experience.
             Whether you're a provider or a consumer, this application simplifies gas billing with speed, security, and reliability.
            </p>
            {/* </div> */}
        </div>
        <div className="right">
            <img src={pipe5} className='rightImg' alt="pipe5" />
        </div>
    </div>
  )
}

export default SubBody
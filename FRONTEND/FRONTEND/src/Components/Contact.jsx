import React from 'react';
import '../Style/Contact.css';
import contact from '../contact.jpg';
import contactbg from '../contactBg.jpeg';

function Contact() {
  return (
    <div 
      className="contact d-flex justify-content-center align-items-center" 
      style={{ 
        backgroundImage: `url(${contactbg})`, 
        backgroundSize: 'contain', 
        backgroundPosition: 'center', 
        minHeight: '90vh'
      }}
    >
        <div className="left p-4 bg-light rounded shadow">
            <h1>Get in Touch</h1>
            <form>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
                <input type="email" className="form-control" id="exampleInputPassword1"/>
            </div>
            <div className='mb-3'>
            <label htmlFor="exampleInputMessage" className="form-label">Message</label>
            <textarea name="text" id="" cols="30" className='form-control' rows="5"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        <div className="rightContact">
        <img src={contact} alt="contact us" className='contactImage'/>
        </div>
    </div>
  );
}

export default Contact;

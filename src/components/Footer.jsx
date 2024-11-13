import { faFacebook, faInstagram, faLinkedinIn, faStackOverflow, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'


function Footer() {
  return (
    <div className='bg-success p-5 mt-5'>
        <div className='container-fluid'>
            <div className="row">
                <div className="col-md-4">
                    <h3 className='text-light'><FontAwesomeIcon icon={faStackOverflow} className='me-3' />Project Fair</h3>
                    <p className='mt-3' style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur est accusamus suscipit quod nisi tenetur exercitationem iusto, molestiae, aliquid totam nulla asperiores? Adipisci, sit aperiam quae repudiandae exercitationem rerum similique. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, dolorum beatae, necessitatibus invens.</p>
                </div>
                <div className='col-md-1'></div>
                <div className="col-md-2 ">
                    <h3 className='text-light ms-6'>Links</h3>
                    <div>
                        <p className='mt-3'>Home</p>
                        <p>Project</p>
                        <p>Dashboard</p>
                    </div>
                </div>
                
                <div className="col-md-2">
                <h3 className='text-light'>Guides</h3>
                    <div>
                        <p className='mt-3'>React</p>
                        <p>React Bootstrap</p>
                        <p>React Bootswatch</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <h3 className='text-light'>Contact Us</h3>
                    <div className='d-flex mt-3'>
                        <input type="text" placeholder='Enter Email Id' className='form-control rounded-0'  />
                        <button className='btn btn-warning ms-3 rounded-0'>Subscribe</button>
                    </div>
                    <div className='d-flex justify-content-between mt-5'>
                    <FontAwesomeIcon icon={faInstagram} className='fa-2x text-light'/>
                    <FontAwesomeIcon icon={faTwitter} className='fa-2x text-light'/>
                    <FontAwesomeIcon icon={faFacebook} className='fa-2x text-light'/>
                    <FontAwesomeIcon icon={faLinkedinIn} className='fa-2x text-light'/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer
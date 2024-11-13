import React from 'react'
import { Link } from 'react-router-dom'

function PagenotFound() {
  return (
    <div className='container-fluid'>
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8 d-flex justify-content-center align-items-center flex-column">

          <img src="https://cdn.svgator.com/images/2024/04/electrocuted-caveman-animation-404-error-page.gif" alt="no image" className='w-50' />
          <h3 className='mt-0'>Look like you are lost</h3>
          <h6>The page you are looking for is unavailable</h6>
          <Link to={'/'}><button className='btn btn-primary mb-4'>Go Home</button></Link>
        </div>
        <div className="col-md-2"></div>
      </div>

    </div>
  )
}

export default PagenotFound
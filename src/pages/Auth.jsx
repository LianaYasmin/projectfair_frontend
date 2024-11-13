import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../services/allApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginResponseContext } from '../context/Contextshare'


function Auth({register}) {

  const {setLoginResponse} = useContext(loginResponseContext)
  const navigate = useNavigate()

  const [userDetails,setUserDetails] = useState({
    username:"",
    email:"",
    password:""
  })
 console.log(userDetails);
 
 const handleRegister =async()=>{
  const {username,email,password}=userDetails
  if(!username || !email || !password){
    toast.info('Please fill the form completely')
  }
  else{
    const result = await registerApi(userDetails)
    console.log(result);
    if(result.status==200){
      toast.success("Registration successfull")
      setLoginResponse(true)
      setUserDetails({
        username:"",
        email:"",
        password:""
      })
      /navigate('/login')
    }
    else if(result.status==406){
      toast.warning(result.response.data)
    }
    else{
      toast.error('Something went wrong')
    }
  }
 }

 const handleLogin = async()=>{
  const {email,password} = userDetails
  if(!email || !password){
    toast.info('Please fill the form completely')
  }else{
    const result = await loginApi({email,password})
    console.log(result);
    if(result.status==200){
      toast.success("Login successfull")

      sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
      sessionStorage.setItem("token",result.data.token )

      setUserDetails({
        username:"",
        email:"",
        password:""
      })
     setTimeout( ()=>{
      navigate('/')
    },2000)
    }
    else if(result.status==406){
      toast.warning(result.response.data)
    }
    else{
      toast.error("Something went wrong")
    }

    
  }
 }

  return (
    <>
      <div className="container">
        <div className="row">
          <h4 className='text-warning mt-5'><FontAwesomeIcon icon={faArrowLeft} style={{ color: 'orange', }} className='me-2' />Back to Home</h4>
          <div className="col-md-1"></div>


          <div className="col-md-10 bg bg-success mt-5 rounded d-flex p-5">
            <div className='row'>
              <div className='col-md-6'>
                <img src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" alt="no image" style={{ width: '100%' }} className='p-5' />
              </div>
              <div className='col-md-6  mt-4 p-4'>
                <h3 className='text-light'><FontAwesomeIcon icon={faStackOverflow} className='me-3 ' />Project Fair</h3>

               {!register ?  <h5 className='text-light'>Sign In to Your account</h5>
               :
                <h5 className='text-light'>Sign Up to Your account</h5>}


                {register && <input type="text" placeholder='Username' value={userDetails.username} className='form-control rounded-0 w-75 mt-5' onChange={(e)=>setUserDetails({...userDetails,username:e.target.value})} />}

                <input type="text" placeholder='Email ID' className='form-control rounded-0 w-75 mt-3' value={userDetails.email}  onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})}/>
                <input type="text" className='form-control rounded-0  w-75 mt-3 ' placeholder='password' value={userDetails.password}  onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})}/>

               {!register? <div>
                  <button className='btn btn-warning mt-3 w-75 rounded-0' onClick={handleLogin}>login</button>
                  <h6 className='text-light mt-4'>New user?Click here to <Link to={'/register'} className='text-danger'>Register</Link></h6>
                </div>
                :
                <div>
                  <button className='btn btn-warning mt-3 w-75 rounded-0' onClick={handleRegister}>Register</button>
                  <h6 className='text-light mt-4'>Already a user?Click here to <Link to={'/login'} className='text-danger'>Login</Link></h6>
                </div>
                }

              </div>
            </div>
          </div>


          <div className="col-md-1"></div>
        </div>
      </div>

      <ToastContainer theme='coloured' position='top-center' autoClose={2000}/>
    </>
  )
}

export default Auth
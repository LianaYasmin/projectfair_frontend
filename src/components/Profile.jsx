import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { serverUrl } from '../services/serverUrl'
import { toast } from 'react-toastify'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateProfileApi } from '../services/allApi'
import { Collapse } from 'react-bootstrap'


function Profile() {
    const [open, setOpen] = useState(false);
   
    const [userDetails,setUserDetails] = useState({
        username:"",
        email:"",
        password:"",
        profile:"",
        github:"",
        linkedin:""
    })
    const [existingImg,setExistingImg] = useState("")
    const [preview,setPreview] = useState("")
    const [updateStatus,setUpdateStatus] = useState({})

    console.log(userDetails);

    const handlefile = (e)=>{
       setUserDetails({...userDetails,profile:e.target.files[0]})
    }

    useEffect(()=>{
       if(userDetails.profile){
        setPreview(URL.createObjectURL(userDetails.profile))
       }
    },[userDetails.profile])

    useEffect(()=>{
        if(sessionStorage.getItem("existingUser")){
            const user = JSON.parse(sessionStorage.getItem("existingUser"))
            console.log(user);
            setUserDetails({...userDetails,username:user.username,email:user.email,password:user.password,github:user.github,linkedin:user.linkedin})
            setExistingImg(user.profile)
        }
    },[updateStatus])

    const handleUpdate= async ()=>{
        const {username,email,password,profile,github,linkedin} = userDetails
        if(!github || !linkedin){
            toast.info('Please add github and linkedin')
        }
        else{
            const reqBody = new FormData()
            reqBody.append("username",username)
            reqBody.append("email",email)
            reqBody.append("password",password)
            reqBody.append("github",github)
            reqBody.append("linkedin",linkedin)
            preview?reqBody.append("profile",profile):reqBody.append("profile",existingImg)

            const token = sessionStorage.getItem("token")
            if(preview){
                const reqHeader ={
                    "Content-Type":"multipart/form-data",
                    "Authorization":`Bearer ${token}`
                  }
                  const result = await updateProfileApi(reqBody,reqHeader)
                  console.log(result);
                  if(result.status==200){
                    toast.success('Updated successfully')
                    sessionStorage.setItem("existingUser",JSON.stringify(result.data))
                    setUpdateStatus(result)
                  }
                  else{
                    toast.error('Something went wrong')
                  }
            }
            else{
                const reqHeader ={
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                 }
                 const result = await updateProfileApi(reqBody,reqHeader)
                 console.log(result);
                 if(result.status==200){
                    toast.success('Updated successfully')
                    sessionStorage.setItem("existingUser",JSON.stringify(result.data))
                    setUpdateStatus(result)
                  }
                  else{
                    toast.error('Something went wrong')
                  } 
            }
        }
    }
    
    return (
        <>

            <div className='p-4 shadow' onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}>
                <div className="d-flex justify-content-between">
                    <h4 style={{color:'rgb(62,179,24)'}}>Profile</h4>
                    <button className='btn' style={{borderColor:'rgb(160,98.192)',color:'rgb(160,98.192)'}} onClick={() => setOpen(!open)}>{open==true?<FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown}/> }</button>
                </div>

               <Collapse in={open}>
                    <div>
                        <div className="d-flex justify-content-center align-items-center flex-column mt-3">
                            <label htmlFor="profileImg" className='mb-4 d-flex justify-content-center align-items-center'>
                                <input type="file" style={{display:'none'}} id='profileImg' onChange={(e)=>handlefile(e)}/>
                              {existingImg==""?
                                <img src={preview?preview:"https://upload.wikimedia.org/wikipedia/commons/a/a8/Google_Contacts_icon_%282022%29.svg"} alt="no image" className='w-50' style={{width:'200px',height:'200px',borderRadius:'50%'}}/>
                           :
                                <img src={preview?preview:`${serverUrl}/upload/${existingImg}`} alt="no image" className='w-50' style={{width:'200px',height:'200px',borderRadius:'50%'}}/>}
                            </label>
        
                           <div className='w-100'>
                                <div className="mb-3">
                                      <input type="text" placeholder='Github' className='form-control' value={userDetails?.github} onChange={(e)=>setUserDetails({...userDetails,github:e.target.value})}/>
                                </div>
                                <div className="mb-3">
                                     <input type="text" placeholder='Linked In' className='form-control' value={userDetails?.linkedin} onChange={(e)=>setUserDetails({...userDetails,linkedin:e.target.value})}/>
                                </div>
                                <div className="mb-3">
                                   <button className='btn btn-success w-100' onClick={handleUpdate}>Update</button>
                                </div>
                           </div>
                        </div>
                    </div>
               </Collapse>

                <ToastContainer theme='coloured' position='top-center' autoClose={2000}/>
            </div>
        </>
    )
}

export default Profile
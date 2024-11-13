import React, { useContext, useEffect, useState } from 'react'
import Addproject from './Addproject'
import Edit from './Edit'
import { faGlobe, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getUserProjectApi, removeUserProjectApi } from '../services/allApi'
import { Link } from 'react-router-dom'
import { addReponseContext, editResponseContext } from '../context/Contextshare'


function Myproject() {
  const [userProject,setUserProject] = useState([])
  const {addResponse} = useContext(addReponseContext)
  const {editResponse} = useContext(editResponseContext)
  const [removeStatus,setRemoveStatus] = useState({})

  const getUserProject = async()=>{
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")

      const reqHeader ={
         "Content-Type":"application/json",
         "Authorization":`Bearer ${token}`
      }

      const result = await getUserProjectApi(reqHeader)
      //console.log(result);
      setUserProject(result.data)
    }
  }
  console.log(userProject);

  const handleDelete = async (id)=>{
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")

      const reqHeader ={
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
     }
     const result = await removeUserProjectApi(id,reqHeader)
     console.log(result);
     if(result.status==200){
      setRemoveStatus(result)
     }
     else{
      alert('Something went wrong')
     }
     
    }
  }
  

  useEffect(()=>{
    getUserProject()
  },[addResponse,removeStatus,editResponse])

  return (
    <div className='p-4 shadow w-100'>

       <div className='d-flex mt-4 justify-content-between'>
        <h4 className='text-success'>My Project</h4>
        <Addproject/>
       </div>

       {userProject?.length>0 ? 
       userProject?.map((item)=>(
        <div className='bg-light p-3 mt-4 rounded-2 d-flex justify-content-between align-items-center'>
        <h5>{item?.title}</h5>
        <div className="d-flex">
         <Edit projects={item}/>
         <Link to={item?.Website} target='_blank'><FontAwesomeIcon icon={faGlobe} className='text-warning mx-3 '/></Link>
         <Link to={item?.github}><FontAwesomeIcon icon={faGithub}  className='text-success mx-3'/></Link>
         <FontAwesomeIcon icon={faTrash}  className='text-danger mx-3' onClick={()=>handleDelete(item?._id)}/>
        </div>
    </div>
       ))
       
          :
       <h4 className='text-center text-warning mt-5'>No Project added yet</h4>}
    </div>
  )
}

export default Myproject
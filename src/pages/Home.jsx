import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import photo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { getHomeProjectApi } from '../services/allApi'


function Home() {

  const [isLogin,setIsLogin] = useState(false)
  const [homeProject,setHomeProject] = useState([])

  const getHomeProject = async()=>{
    const result = await getHomeProjectApi()
    // console.log(result);
    setHomeProject(result.data)
    
  }
  console.log(homeProject);
  

   useEffect(()=>{
    getHomeProject()
     if(sessionStorage.getItem("token")){
      setIsLogin(true)
     }
     else{
      setIsLogin(false)
     }
   },[])
  return (
   <>
      <div style={{height:'100vh'}} className='bg-success p-5'>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
           
              <h1 style={{fontSize:'70px',color:'white'}} className='mt-5'>Project Fair </h1>
              <p className='mt-5'>One stop destination for for all software development projects</p>
             { !isLogin ?<Link to={'/login'}><button className='btn text-light p-0 mt-3'>Get started<FontAwesomeIcon icon={faArrowRight} /></button></Link>:
              <Link to={'/dashboard'}><button className='btn text-light p-0 mt-3'>Manage Project<FontAwesomeIcon icon={faArrowRight} /></button></Link>
             }
  
            </div>
            <div className="col-md-6">
              <img src={photo} alt="no image" style={{width:'60%'}} className=''/>
            </div>
          </div>
        </div>
      </div>
  
      <div>
        <h2  className='text-center my-5'>Explore Our projects</h2>
        <div className="container">
          <div className="row">


            {homeProject?.map((item)=>(
              <div className="col-md-4">
              <ProjectCard project={item}/>
             </div>
            ))
            }


          </div>
        </div>
        <Link to={'/projects'}><p className='text-center my-4'>See more projects</p></Link>
      </div>
   </>
  )
}

export default Home
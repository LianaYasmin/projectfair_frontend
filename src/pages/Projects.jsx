import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import ProjectCard from '../components/ProjectCard'
import { getAllProjectApi, loginApi } from '../services/allApi'


function Projects() {

  const [allProject, setAllProject] = useState([])
  const [token, setToken] = useState("")
  const [searchkey,setSearchkey] = useState("")

  const getAllProject = async () => {
    if (sessionStorage.getItem("token")) {
      const token= sessionStorage.getItem("token")
      const reqHeader ={
        "Content-Type":"application/json",
         "Authorization":`Bearer ${token}`
     }
 
     const result = await getAllProjectApi(searchkey,reqHeader)
     setAllProject(result.data);

    }
   }
  console.log(allProject);

  console.log(token);
  console.log(searchkey);
  

  useEffect(() => {
    getAllProject()
    }, [searchkey])

    useEffect(()=>{
        if(sessionStorage.getItem("token")){
          setToken(sessionStorage.getItem("token"))
        }
    },[])



  return (
    <>
      <Header />

      <div className='my-5'>
        <h3 className='text-center'>All Projects</h3>



        {!token ?
          <div className='container-fluid'>
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6 d-flex justify-content-center align-items-center flex-column">
                <img src="https://images.squarespace-cdn.com/content/v1/55e06d0ee4b0718764fcc921/1507805805238-M8XG4RMCMWITZ7LJGEEF/slidebank+login.gif" alt="no image" className='w-50 mt-5' />
                <h5 className='text-danger mt-5'>Please <Link to={'/login'}>Login</Link> to see more projects</h5>
              </div>
              <div className="col-md-3"></div>
            </div>

          </div>

          :
          <div>
            <div className='mt-5'>
              <div className="container">
                <div className="row">
                  <div className="col-md-4"></div>

                  <div className="col-md-4 d-flex">
                    <input type="text" placeholder='Technologies' className='form-control' onChange={(e)=>setSearchkey(e.target.value)}/>
                    <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: 'lightgrey', marginTop: '11.5px', marginLeft: '-30px' }} />
                  </div>

                  <div className="col-md-4"></div>
                </div>
              </div>
            </div>

            <div className="container-fluid p-md-5 p-4 mt-5">
              <div className="row">
               {allProject?.map((item)=>(
                    <div className="col-md-3">
                    <ProjectCard project={item}/>
                  </div>
               )) 
               }

              </div>
            </div>

          </div>


        }
      </div>

    </>
  )
}

export default Projects
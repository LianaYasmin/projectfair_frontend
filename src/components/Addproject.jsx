import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectApi } from '../services/allApi';
import { addReponseContext } from '../context/Contextshare';

function Addproject() {
  const [show, setShow] = useState(false);
  const {setAddResponse} = useContext(addReponseContext)
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    language: "",
    github: "",
    Website: "",
    overview: "",
    projectImage: ""
  })

  const [preview, setPreview] = useState("")
  const [token,setToken] = useState("")
  const [key,setKey] =useState(1)

  console.log(projectDetails);
  console.log(preview);
  console.log(token);
  


  const handleFile = (e) => {
    console.log(e.target.files[0]);
    setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })

  }


  const handleClose = () => {setShow(false);
    handleCancel()
  }
  const handleShow = () => setShow(true);

  const handleCancel = () => {
    setProjectDetails({
      title: "",
      language: "",
      github: "",
      Website: "",
      overview: "",
      projectImage: ""
    })
    setPreview("")
    if(key==1){
      setKey(0)
    }
    else{
      setKey(1)
    }
  }

  const handleAdd = async()=>{

    const{title,language,Website,github,overview,projectImage} = projectDetails
    if(!title || !language  || !github || !Website || !overview || !projectImage){
      toast.info("Please fill the form completely")
    }
    else{
      const reqBody = new FormData()

      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("Website",Website)
      reqBody.append("overview",overview)
      reqBody.append("projectImage",projectImage)

     if(token){
      const reqHeader ={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`

      }
      const result = await addProjectApi(reqBody,reqHeader)
      console.log(result);
      if(result.status==200){
        toast.success('Project added successfully')
        setTimeout(() => {
          handleClose()
        }, 2003);
        setAddResponse(result)
      }
      else if(result.status==406){
        toast.warning(result.response.data)
        handleCancel
      }
      else{
        toast.error('Something went wrong')
        handleClose()
      }
     }
     else{
      toast.warning("Please Login")
     }
    }
  }

  useEffect(() => {
    if (projectDetails.projectImage) {
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
  }, [projectDetails.projectImage])

  useEffect(()=>{
     if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
     }
  },[])

  return (
    <>
      <button className='btn btn-success rounded-0' onClick={handleShow}>Add Project</button>

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Add Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="prjctfile">
                  <input type="file" id='prjctfile' style={{ display: 'none' }} key={key} onChange={(e) => handleFile(e)} />
                  <img src={preview ? preview : "https://cdn.pixabay.com/photo/2021/12/29/02/10/idea-6900632_640.png"} alt="no image" className='w-100' />
                </label>
              </div>
              <div className="col-md-6">
                <div className="mb-3 mt-2">
                  <input type="text" placeholder='Title' className='form-control' value={projectDetails.title} onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} />
                </div>
                <div className="mb-3">
                  <input type="text" placeholder='Language' className='form-control' value={projectDetails.language} onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} />
                </div>
                <div className="mb-3">
                  <input type="text" placeholder='GitHub' className='form-control' value={projectDetails.github} onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} />
                </div>
                <div className="mb-3">
                  <input type="text" placeholder='Website' className='form-control' value={projectDetails.Website} onChange={(e) => setProjectDetails({ ...projectDetails, Website: e.target.value })} />
                </div>
                <div className="mb-3">
                  <textarea placeholder='Overiew' rows={5} className='form-control' value={projectDetails.overview} onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })}></textarea>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
        <ToastContainer theme='coloured' position='top-center' autoClose={2000}/>
      </Modal>

      
    </>
  )
}

export default Addproject
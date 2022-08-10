import React from 'react'
import pagenotfound from '../assets/pagenotfound.png'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


const NotFound = () => {

  const navigate = useNavigate();

  const goback = () => {
    navigate('/')
  }

  return (
    <div>
      <center><img src={pagenotfound} style={{padding:"50px", width:"200px"}}/></center>
      <div>
      <center><h1>Page Not found</h1></center>
      </div>
      <div>
        <center><Button style={{margin:"20px"}} onClick={goback} variant="flat" size="xxl">
        Click to go back
      </Button></center>
      </div>
    </div>
  )
}

export default NotFound;

import React, {useState} from 'react'
import {get_project_byId} from '../Queries&Mutation/ProjectQuery'
import { useQuery, useMutation} from '@apollo/client'
import {Link, useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import {Button, Card, Modal} from 'react-bootstrap';
import {AiOutlineFundProjectionScreen, AiTwotonePhone, AiTwotoneMail} from 'react-icons/ai'
import { IoCheckmarkDoneCircleSharp} from 'react-icons/io5'
import {FcDeleteDatabase} from 'react-icons/fc'
import {get_projects} from '../Queries&Mutation/ProjectQuery'
import {delete_project} from '../Queries&Mutation/ProjectMutation'
import UpdateProject from '../Components/UpdateProject';


const Project = () => {

  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const goback = () => {
    navigate('/')
  }

  
  const {id} = useParams();

 

  const [RemoveProject] = useMutation(delete_project, {
    variables: {id: id},
    onCompleted: () => navigate('/'),
    //when you make a lot of queries the app might end up in bug..So an alternative to that will be to use cache.
    refetchQueries: [{query: get_projects}]
    // update(cache, { data: { deleteClient } }) {
//   const { clients } = cache.readQuery({ query: GET_CLIENTS });
//   cache.writeQuery({
//     query: GET_CLIENTS,
//     data: {
//       clients: clients.filter((client) => client.id !== deleteClient.id),
//     },
//   });
// },

  })
  const {loading, error, data} = useQuery(get_project_byId, {
    variables: {id: id}
  })
  if(loading) return <center><h1>Loading project details..</h1></center>

  if (error) return <center><h1>Some thing went wrong</h1></center>
  

  
    

  return (
    
    
    
    <div>
    <div style={{padding:"50px"}}>
    <Button style={{margin:"20px"}} onClick={goback} variant="flat" size="xxl">
        Click to go back
      </Button> 
      <UpdateProject key={data.project.id} projectdetails={data.project}/>
      <Button style={{margin:"20px"}} variant="flat" onClick={handleShow} size="xxl">
        <FcDeleteDatabase />{' '}Delete project
      </Button>
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure,all the project details will be erased</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button  variant="flat" size="xxl" onClick={RemoveProject}>
            yes
          </Button>
        </Modal.Footer>
      </Modal>
      
      <center>
      <h3  style={{color:"#1677C4"}}>Project details</h3>{' '}
      </center>
    <center>
    <Card style={{ width: '50rem' }}>
      <Card.Body>
        <h6 style={{color:"#EA4FB4"}}>Project Name</h6>
        <Card.Title><AiOutlineFundProjectionScreen />{' '}{data.project.name}</Card.Title>
        <h6 style={{color:"#EA4FB4"}}>Project status</h6>
        <Card.Subtitle className="mb-2 text-muted"><IoCheckmarkDoneCircleSharp />{' '}{data.project.status}</Card.Subtitle>
        <h6 style={{color:"#EA4FB4"}}>Project Description</h6>
        <Card.Text>
          {data.project.description}
        </Card.Text>
      </Card.Body>
    </Card>
    </center>
    </div>
    <div style={{padding:"50px"}}>
    <center><h3  style={{color:"#EA4FB4"}}>Client details</h3></center>
    <center>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
      <h6  style={{color:"#1677C4"}}>Client name</h6>
        <Card.Title>{data.project.client.name}</Card.Title>
        <h6  style={{color:"#1677C4"}}>Client email</h6>
        <Card.Subtitle className="mb-2 text-muted"><AiTwotoneMail />{' '}{data.project.client.email}</Card.Subtitle>
        <h6  style={{color:"#1677C4"}}>Contact</h6>
        <Card.Text>
        <AiTwotonePhone />{' '}{data.project.client.phone}
        </Card.Text>
      </Card.Body> 
    </Card>
    </center>
    </div>
    </div>
   
  )
}

export default Project;

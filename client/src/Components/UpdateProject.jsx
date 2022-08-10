import React, {useState} from 'react'
import {Button, Card, Modal, Form} from 'react-bootstrap';
import {GrUpdate} from 'react-icons/gr'
import {get_project_byId} from '../Queries&Mutation/ProjectQuery'
import {update_project} from '../Queries&Mutation/ProjectMutation'
import { useMutation } from '@apollo/client';


const UpdateProject = ({projectdetails}) => {

    const [name, setName] = useState(projectdetails.name);
    const [description, setDescription] = useState(projectdetails.description);
    const [status, setStatus] = useState(() => {
      switch (projectdetails.status) {
        case "Not Started":
          return "new";
        case "In Progress":
          return "progress";
        case "Completed":
          return "completed";
        default:
          throw new Error(`Unknown status: ${projectdetails.status}`);
      }
    });

    const [updatingproject] = useMutation(update_project, {
        variables: {id : projectdetails.id, name, description, status},
        refetchQueries: [{query: get_project_byId,
        variables: { id: projectdetails.id}}]
      })

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit = (e) => {
    e.preventDefault();
    if(!name || !description || !status) {
      return alert('Please fill in all details')
    }
    updatingproject(name, description, status);

    handleClose();
  }

  return (
    <div>
        <Button  variant="flat" onClick={handleShow} size="xxl">
        <GrUpdate />{' '}Update project details
      </Button>
        <Modal style={{color:"#000000"}} show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Update project</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={onSubmit} >
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control
          value={name}
          onChange = {(e)=> setName(e.target.value)}
            type="text"
            placeholder="Enter project name"
            autoFocus
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3}
            value={description}
            onChange = {(e)=> setDescription(e.target.value)}
            placeholder="Enter description"
            />
             </Form.Group>
<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
<Form.Label>Status</Form.Label>
<Form.Select aria-label="Default select example"
id='status'
value={status}
 onChange = {(e)=> setStatus(e.target.value)}>
    
  <option value="new">Not Started</option>
  <option value="completed">Completed</option>
  <option value="progress">In Progress</option>
</Form.Select>
</Form.Group>       
        <Button type="submit" size="xxl">
        update Project
        </Button>
        </Form>
    </Modal.Body>
  </Modal></div>
  )
}

export default UpdateProject;

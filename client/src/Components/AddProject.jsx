import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useMutation, useQuery } from '@apollo/client';
import {add_project} from '../Queries&Mutation/ProjectMutation'
import { get_projects } from '../Queries&Mutation/ProjectQuery';
import { get_clients } from '../Queries&Mutation/ClientQuery';

import {FaList} from 'react-icons/fa'


const AddProject = () => {
  
    const [show, setShow] = useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [clientId, setClientId] = useState(' ');
    const [status, setStatus] = useState('new');

    const [addProject] = useMutation(add_project, {
      variables: {name, description, clientId, status},
      refetchQueries: [{query: get_projects}]
    })

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //get clients to select

  const {loading, error, data} = useQuery(get_clients)

  const onSubmit = (e) => {
    e.preventDefault();
    if(name === ' ' || description === ' ' || status === ' ') {
      return alert('Please fill in all details')
    }
    addProject(name, description, clientId, status);

    setName(' ')
    setDescription(' ')
    setClientId(' ')
    setStatus('new')

    handleClose();
  }

  if (loading) return null;
  if(error) return 'something went wrong'
  
  return (
    
    <>

      <style type="text/css">
        {`
    .btn-flat {
      background-color: #df3ca6;
      color: white;
    }
    `}
      </style>
      {!loading && !error && (
        <>
        <Button style={{margin:"20px"}} variant="flat" onClick={handleShow} size="xxl">
        <FaList />{' '}Add Project
      </Button>

      <Modal style={{color:"#000000"}} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter project name"
                value={name}
                onChange = {(e)=> setName(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3}
                placeholder="Enter description"
                value={description}
                onChange = {(e)=> setDescription(e.target.value)}/>
                 </Form.Group>
 <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
 <Form.Label>Status</Form.Label>
 <Form.Select aria-label="Default select example"
 id='status'
 value={status}
 onChange = {(e)=> setStatus(e.target.value)}>
      <option value="new">Not Started</option>
      <option value="Completed">Completed</option>
      <option value="progress">In Progress</option>
    </Form.Select>
 </Form.Group>

 <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
 <Form.Label>Client</Form.Label>
 <Form.Select aria-label="Default select example"
 value={clientId}
 onChange = {(e)=> setClientId(e.target.value)}>
      <option>Select status</option>
      {
        data.clients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.name}
          </option>
        ))
      }
    </Form.Select>
 </Form.Group>

    
           
            <Button variant="flat" type="submit" size="xxl">
            Add Project
            </Button>
            </Form>
        </Modal.Body>
      </Modal>
        </>
      )}
    </>
  )
}

export default AddProject;
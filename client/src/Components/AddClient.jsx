import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {FaUserPlus} from 'react-icons/fa'
import {add_client} from '../Queries&Mutation/ClientMutation'
import { useMutation } from '@apollo/client';
import {get_clients} from '../Queries&Mutation/ClientQuery'


const AddClient = () => {
  
    const [show, setShow] = useState(false);

    const [name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [add_Client] = useMutation(add_client, {
      variables: {name: name, email: Email, phone: phone},
      refetchQueries: [{query: get_clients}]
    })

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit = (e) => {
    e.preventDefault();
    if(name === ' ' && Email === ' ' && phone === ' ' ) {
      return alert('Please fill in all details')
    }
    add_Client();

    setName(' ')
    setEmail(' ')
    setPhone(' ')

    handleClose();
  }
  
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

      <Button style={{margin:"20px"}} variant="flat" onClick={handleShow} size="xxl">
        <FaUserPlus /> Add Client
      </Button>

      <Modal style={{color:"#000000"}} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange = {(e)=> setName(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                value={Email}
                onChange = {(e)=> setEmail(e.target.value)}
                
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="phone"
                value={phone}
                onChange = {(e)=> setPhone(e.target.value)}
                
              />
            </Form.Group>
            <Button variant="flat" type="submit" size="xxl">
            Add Client
            </Button>
            </Form>
        </Modal.Body>
      </Modal>

    </>
  )
}

export default AddClient;

import React, {useState}from 'react'
import {Button, Modal} from 'react-bootstrap';
import {FcDeleteDatabase} from 'react-icons/fc'
import { useMutation } from '@apollo/client';
import {delete_client} from '../Queries&Mutation/ClientMutation'
import {get_clients} from '../Queries&Mutation/ClientQuery'
import {get_projects} from '../Queries&Mutation/ProjectQuery'

const ClientData = ({clients}) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const [remove_client] = useMutation(delete_client, {
        variables: {id: clients.id},
        //when you make a lot of queries the app might end up in bug..So an alternative to that will be to use cache.
        refetchQueries: [{query: get_clients}, {query: get_projects }]
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

  return (
    <tr>
               <td>{clients.name}</td>
               <td>{clients.email}</td>
               <td>{clients.phone}</td>
               <td>
               <center>
               <Button style={{align:"center"}} 
               variant="secondary"
               onClick={handleShow}
               >
               <FcDeleteDatabase />
               </Button>
               <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure,all the client data along with the projects will be removed.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button  variant="flat" size="xxl" onClick={remove_client}>
            yes
          </Button>
        </Modal.Footer>
      </Modal>

               </center>
               
               </td>
             </tr>
  )
}

export default ClientData;

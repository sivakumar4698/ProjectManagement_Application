//This file contains all the queries data that we get from graph QL
import { useQuery} from '@apollo/client'
import {Table} from 'react-bootstrap';
import {get_clients} from '../Queries&Mutation/ClientQuery'
import ClientData from './ClientData';

const Clients = () => {
    const {loading, error, data} = useQuery(get_clients)

   

    if(loading) return <center><h1>Loading Clients..</h1></center>

    if (error) return <p>some thing is wrong</p>

  return (
    <div style={{padding:"20px"}} >{!loading && !error &&
      <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {
           data.clients.map(client =>(
             <ClientData key={client.name} clients={client} />
           ))
         }

      </tbody>
    </Table>}</div>
  )
}

export default Clients;

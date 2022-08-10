import React from 'react'
import AddClient from '../Components/AddClient';
import Projects from '../Components/Projects';
import Clients from '../Components/Clients';
import AddProject from '../Components/AddProject'

const Home = () => {
  return (
    <div>
        <AddClient />
        <AddProject />
      <Projects />
      <Clients />
    </div>
  )
}

export default Home;

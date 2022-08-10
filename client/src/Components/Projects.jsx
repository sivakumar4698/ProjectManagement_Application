import React from 'react'
import {Card, Row, Col} from 'react-bootstrap'
import {get_projects} from '../Queries&Mutation/ProjectQuery'
import { useQuery} from '@apollo/client'
import { SiProgress } from 'react-icons/si'
import { IoCheckmarkDoneCircleSharp} from 'react-icons/io5'
import { BsSkipStartCircleFill} from 'react-icons/bs'

const Projects = () => {

    const {loading, error, data} = useQuery(get_projects)

    if(loading) return <center><h1>Loading Projects..</h1></center>

    if (error) return <p>some thing is wrong</p>

  return (
    <div>
    { data.projects.length > 0 ? (<Row>
    {
      data.projects.map((project) => {
        return (
          <Col className="col-5" style={{padding:"50px", align:"center"}}>
             <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{project.name}</Card.Title>
        {project.status === "completed" ? (<Card.Text>
          <IoCheckmarkDoneCircleSharp />{' '}{project.status}
        </Card.Text>) : (<div></div>) }
        {project.status === "In Progress" ? (<Card.Text>
          <SiProgress />{' '}{project.status}
        </Card.Text>) : (<div></div>) }
        {project.status === "Not Started" ? (<Card.Text>
          <BsSkipStartCircleFill />{' '}{project.status}
        </Card.Text>) : (<div></div>) }
        <a style={{color:"#df3ca6"}} href={`/project/${project.id}`}>
         Project Details
      </a>      </Card.Body>
    </Card>
          </Col>
        );
      })}
  </Row>) : (<center><h1>Add projects to display!</h1></center>)
}
  </div>
    )
}

export default Projects;

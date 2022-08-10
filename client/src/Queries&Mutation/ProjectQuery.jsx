import {gql} from '@apollo/client'


const get_projects = gql`
    query getProjects {
        projects {
            id
            name
            status
            description
            
          }
}
`

const get_project_byId = gql`
query getprojectbyid ($id: ID!){
    project(id : $id) {
      id
      name
      status
      description
      client {
        id
        name
        email
        phone
      }
    }
  }
`



export {get_projects, get_project_byId }
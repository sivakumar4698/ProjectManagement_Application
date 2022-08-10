import {gql} from '@apollo/client'



const add_project = gql`
    mutation addProject(
        $name: String!
         $description: String!
          $status: ProjectStatus!  
          $clientId: ID! ) {
        addProject(name : $name
            description: $description
             status: $status
             clientId: $clientId ) {
        id
        name
        description
        status
        client {
            id
            name
            email
            phone
        }
    }
}
`;

const delete_project = gql`
    mutation deleteProject($id: ID!) {
        deleteproject(id : $id) {
        id
    }
}
`

const update_project = gql`
    mutation updateProject(
        $id: ID!
        $name: String!
         $description: String!
          $status: ProjectStatusUpdate!  
          ) {
        updateproject(
            id : $id
            name : $name
            description: $description
             status: $status
             ) {
        id
        name
        description
        status
        client {
            id
            name
            email
            phone
        }
    }
}
`;




export {add_project, delete_project, update_project}
import {gql} from '@apollo/client'


const delete_client = gql`
    mutation deleteclient($id: ID!) {
        deleteclient(id : $id) {
        id
        name
        email
        phone
    }
}
`

const add_client = gql`
    mutation addClient($name: String!, $email: String!, $phone: String! ) {
        addClient(name : $name, email: $email, phone: $phone ) {
        id
        name
        email
        phone
    }
}
`

export {delete_client, add_client}
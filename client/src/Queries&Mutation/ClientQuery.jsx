import {gql} from '@apollo/client'


const get_clients = gql`
    query getClients {
    clients {
        id
        name
        email
        phone
    }
}
`

export {get_clients}
import Header from './Components/Header'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client'
import Home from './Pages/Home'
import NotFound from './Pages/NotFound'
import Project from './Pages/Project'
//Apollo is a client which works with the graphql API

//using cache to process the queries instead of fetching them back again from the database

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
})

function App() {
  return (
    <>
      <ApolloProvider client = {client}>
      <Router>
      <Header />
      <div>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='*' element={<NotFound />}></Route>
        <Route path='/project/:id' element={<Project />} ></Route>
      </Routes>
      </div>
      </Router>
      </ApolloProvider>
    </>
  );
}

export default App;

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { setContext } from 'apollo-link-context'
import './index.css'

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'

import { BrowserRouter as Router } from 'react-router-dom'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('KirjaKirppis-user-token')
  return {
    headers: {
      ...headers,
      Authorization: token ? `bearer ${token}` : null,
    },
  }
})

const httplink = new HttpLink({
  uri: 'http://localhost:4000/',
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httplink),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <link
      rel='stylesheet'
      href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
    />
    <link
      rel='stylesheet'
      href='https://fonts.googleapis.com/icon?family=Material+Icons'
    />
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
)

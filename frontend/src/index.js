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
  uri: 'https://nhc02zvzbj.execute-api.eu-central-1.amazonaws.com/dev/graphql',
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
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)

import { gql } from "apollo-boost"

export const CREATE_LISTING = gql`
  mutation createListing(
    $user: ID!
    $price: Float!
    $information: String
    $series: String!
    $title: String!
    $publisher: String!
    $subject: String!
    $condition: String!
    $school: String!
    ) {
      createListing(
      User: $user
      Price: $price
      Information: $information
      Series:  $series
      Title: $title
      Publisher: $publisher
      Subject: $subject
      Condition: $condition
      School: $school
      ) {
        Title
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      token
      username
      id
    }
  }
`

export const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!, $email: String!) {
    createUser(username: $username, password: $password, email: $email)  {
      id
    }
  }
`
import { gql } from '@apollo/client'

export const ALL_LISTINGS = gql`
  query allListings(
    $user: ID
    $series: String
    $title: String
    $publisher: String
    $subject: String
    $condition: Int
    $school: String
  ) {
    allListings(
      User: $user
      Series: $series
      Title: $title
      Publisher: $publisher
      Subject: $subject
      Condition: $condition
      School: $school
    ) {
      User {
        name
        username
        id
        phonenumber
      }
      Price
      Information
      Series
      Title
      Publisher
      Subject
      Condition
      School
      id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      username
      id
    }
  }
`

export const ME = gql`
  query {
    me {
      name
      username
      phonenumber
      email
      listings {
        Title
      }
      information
      passwordhash
      school
      id
    }
  }
`

export const CREATE_LISTING = gql`
  mutation createListing(
    $user: ID!
    $price: Float!
    $information: String
    $series: String!
    $title: String!
    $publisher: String!
    $subject: String!
    $condition: Int!
    $school: String!
  ) {
    createListing(
      User: $user
      Price: $price
      Information: $information
      Series: $series
      Title: $title
      Publisher: $publisher
      Subject: $subject
      Condition: $condition
      School: $school
    ) {
      User {
        id
      }
      Price
      Information
      Series
      Title
      Publisher
      Subject
      Condition
      School
    }
  }
`

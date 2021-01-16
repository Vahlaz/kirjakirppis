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
        email
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
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        name
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
  }
`

export const ME = gql`
  query {
    me {
      name
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

export const CREATE_USER = gql`
  mutation createUser(
    $email: String!
    $password: String!
    $name: String!
    $phonenumber: String!
    $school: String!
  ) {
    createUser(
      email: $email
      password: $password
      name: $name
      phonenumber: $phonenumber
      school: $school
    ) {
      id
      name
    }
  }
`
export const REMOVE_LISTING = gql`
  mutation removeListing($id: ID!) {
    removeListing(id: $id)
  }
`

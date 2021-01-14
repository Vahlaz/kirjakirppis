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
    $condition: Int!
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
        User{
          name
          id
          phonenumber
        }
        id
        Title
        Publisher
        Series
        Title
        Subject
        Condition
        Information
        Price
    }
  }
`

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)  {
      token
      user{
      name
      email
      phonenumber
      id
      }
    }
  }
`

export const CREATE_USER = gql`
  mutation createUser($email: String!, $password: String!, $name: String!, $phonenumber: String!) {
    createUser(
      email: $email,
      password: $password, 
      name: $name,
      phonenumber: $phonenumber
      ){
      id
      name
    }
  }
`

export const DELETE_LISTING = gql`
  mutation removeListing($id: ID!) {
    removeListing(
      id: $id,
      )
  }
`
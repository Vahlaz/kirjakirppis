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
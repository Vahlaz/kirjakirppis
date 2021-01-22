import { gql } from "@apollo/client"

export const ALL_LISTINGS = gql`
  query allListings(
    $user: ID
    $series: String
    $title: String
    $publisher: String
    $subjects: [String!]
    $condition: Int
    $school: String 
  ) {
    allListings(
      User: $user
      Series: $series
      Title: $title
      Publisher: $publisher
      Subjects: $subjects
      Condition: $condition
      School: $school
    ) {
      User{
          name
          id
          phonenumber
      }
      Price
      Information
      Series
      Title
      Publisher
      Subjects
      Condition
      School
      id
    }
  }
`
import { gql } from "@apollo/client"

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
      Subject
      Condition
      School
      id
    }
  }
`
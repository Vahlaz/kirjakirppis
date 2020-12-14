import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_LISTINGS } from './queries.js'
import { CircularProgress } from '@material-ui/core'
import ListingTable from './ListingTable'
const SchoolFrontPage = () => {
  const School = localStorage.getItem('KirjaKirppis-school')
  console.log(School)
  const result = useQuery(ALL_LISTINGS, {
    variables: { school: `${School}` },
  })

  if (result.loading) {
    return (
      <>
        <CircularProgress />
      </>
    )
  }
  const allListings = result.data.allListings
  console.log(allListings)
  return (
    <div>
      {School}
      <ListingTable data={allListings} />
    </div>
  )
}

export default SchoolFrontPage

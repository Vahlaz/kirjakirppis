import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_LISTINGS } from './queries.js'
import { CircularProgress, Fab } from '@material-ui/core'
import ListingTable from './ListingTable'
import { useHistory } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'
const SchoolFrontPage = () => {
  const history = useHistory()
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
      <button
        onClick={() => {
          window.localStorage.removeItem('KirjaKirppis-school')
          history.push('/')
        }}
      >
        removeschool
      </button>
      <ListingTable data={allListings} />
      <Fab >
        <AddIcon />
      </Fab>
    </div>
  )
}

export default SchoolFrontPage

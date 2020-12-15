import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_LISTINGS } from './queries.js'
import { CircularProgress, Container, Fab, Grid, Typography } from '@material-ui/core'
import ListingTable from './ListingTable'
import { useHistory } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'
import UserWindow from './UserWindow.js'
import { ME } from './queries.js'

const SchoolFrontPage = () => {
  const history = useHistory()
  const token = localStorage.getItem('KirjaKirppis-user-token')
  const School = localStorage.getItem('KirjaKirppis-school')
  const result = useQuery(ALL_LISTINGS, {
    variables: { school: `${School}` },
  })

  const userResult = useQuery(ME)

  if (userResult.loading) {
    return (
      <>
        <CircularProgress />
      </>
    )
  }
  const user = userResult.data.me
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
      <Grid container direction='row' spacing={1}>
        <Typography variant='h3'>{School}</Typography>
        <button
          onClick={() => {
            window.localStorage.removeItem('KirjaKirppis-school')
            history.push('/')
          }}
        >
          removeschool
        </button>
        <Grid item xs={9}>
          <ListingTable data={allListings} />
        </Grid>
        <Grid item xs={3}>
          <UserWindow token={token} user={user} />
        </Grid>
        <Grid item xs={3}>
          <Container>
            <Fab>
              <AddIcon />
            </Fab>
          </Container>
        </Grid>
      </Grid>
    </div>
  )
}

export default SchoolFrontPage

import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_LISTINGS } from './queries.js'
import { CircularProgress, Fab, Grid, Typography } from '@material-ui/core'
import ListingTable from './ListingTable'
import { useHistory } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'
import UserWindow from './UserWindow.js'
import { ME } from './queries.js'
import NewListingForm from './NewListingsForm.js'

const SchoolFrontPage = () => {
  const history = useHistory()
  const [token, setToken] = useState('')
  const [user, setUser] = useState()

  const School = localStorage.getItem('KirjaKirppis-school')
  const result = useQuery(ALL_LISTINGS, {
    variables: { school: `${School}` },
  })
  useEffect(() => setToken(localStorage.getItem('KirjaKirppis-user-token')), [])

  const userResult = useQuery(ME)

  if (userResult.loading) {
    return (
      <>
        <CircularProgress />
      </>
    )
  }
console.log(userResult.data)
  if (!user && userResult.data.me) {
    setUser(userResult.data.me)
  }

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
      <Grid container direction='row' justify='center' spacing={1}>
        <Grid item>
          <Typography variant='h3'>{School}</Typography>
          <button
            onClick={() => {
              window.localStorage.removeItem('KirjaKirppis-school')
              history.push('/')
            }}
          >
            removeschool
          </button>
        </Grid>
        <Grid item xs={9}>
          <ListingTable data={allListings} />
        </Grid>
        <Grid item xs={3}>
          <Grid container justify='center' direction='column' spacing={1}>
            <Grid item>
              <UserWindow token={token} setUser={setUser} user={user} />
            </Grid>
            <Grid item>
              {user?.school === School ? (
                <NewListingForm user={user} />
              ) : (
                <Typography variant='subtitle1'>
                  Voit luoda listauksia vain omaan kouluusi
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default SchoolFrontPage

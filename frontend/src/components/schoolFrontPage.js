import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_LISTINGS } from './queries.js'
import {
  CircularProgress,
  Grid,
} from '@material-ui/core'
import ListingTable from './ListingTable'
import UserWindow from './UserWindow.js'
import { ME } from './queries.js'
import NewListingForm from './NewListingsForm.js'
import UserListings from './UserListings'
import ListingSearch from './ListingSearch'
import { Autocomplete } from '@material-ui/lab'
import books from '../assets/books.json'
import { CssTextField, CssButton } from './StyledComponents'


const SchoolFrontPage = ({ setSchool }) => {
  const [token, setToken] = useState('')
  const [user, setUser] = useState('')
  const [search, setSearch] = useState()
  const School = localStorage.getItem('KirjaKirppis-school')
  const result = useQuery(ALL_LISTINGS, {
    variables: { school: `${School}` },
  })
  useEffect(() => setToken(localStorage.getItem('KirjaKirppis-user-token')), [])

  const userResult = useQuery(ME)

  const setBackground = () => {
    document.body.style.background = "#E5E5E5 #url('../assets/background.png') norepeat center"
  }


  if (userResult.loading) {
    return (
      <>
        <CircularProgress />
      </>
    )
  }
  if (!user && token && userResult.data.me) {
    setUser(userResult.data.me)
  }
  if (result.loading) {
    return (
      <div className="frontpageBox item">
        <CircularProgress />
      </div>
    )
  }

  const allListings = ListingSearch(result.data.allListings, search)
  setBackground()

  return (
    <div className="relative">
      <Grid container direction='column' justify='center'>
        <Grid item>
          <h1 className="header1">  {School} </h1>
        </Grid>
        <Grid item>
          <CssButton
            className="searchBox"
            onClick={() => {
              window.localStorage.removeItem('KirjaKirppis-school')
              setSchool('')
            }}
            variant="outlined"
            color="primary"
          >
            Vaihda koulua
          </CssButton>
        </Grid>
      </Grid>
      <Grid container direction='row' justify='center' spacing={1}>
        <Grid item xs={9} >
          <Autocomplete
            className="listingBox"
            onChange={(event, newValue) => {
              setSearch((newValue))
            }}
            options={books}
            getOptionLabel={(option) => option.title}
            margin='normal'
            renderInput={(params) => (
              <CssTextField
                {...params}
                label='Etsi kirja'
                variant='outlined'
              />
            )}
          />
          <ListingTable data={allListings} user={user} />
        </Grid>
        <Grid item xs={3}>
          <Grid container justify='center' direction='column' spacing={1}>
            <Grid item>
              <UserWindow token={token} setUser={setUser} user={user} />
            </Grid>
            <Grid item>
              <NewListingForm user={user} />
            </Grid>
            <Grid item>
              <UserListings listings={result.data.allListings} user={user} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div >
  )
}

export default SchoolFrontPage

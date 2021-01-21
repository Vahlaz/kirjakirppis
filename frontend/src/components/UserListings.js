import {
  Accordion,
  AccordionSummary,
  Container,
  Grid,
  Typography,
  Paper,
  AccordionDetails,
} from '@material-ui/core'
import books from '../assets/books.json'
import React from 'react'
import { ExpandMoreOutlined } from '@material-ui/icons'
import DeleteButton from './DeleteButton'
const UserListings = ({ listings, user }) => {
  const yourListings = listings.filter((a) => a.User.id === user.id)
  if (!user) {
    return <></>
  }

  return (
    <Container component={Paper}>
      <Typography variant='h6'>Omat listaukset:</Typography>
      {yourListings.map((listing) => (
        <Accordion square key={listing.id} >
          <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
            <Grid
              container
              direction='row'
              alignItems='center'
              justify='space-around'
              spacing={1}
            >
              <Grid item xs={10}>
                <Typography variant='body2'>{listing.Title}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant='body2'>{listing.Price}€</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container alignItems='center' direction='row'>
              <Grid item xs={10}>
                <Typography variant='body2'>{listing.Information}</Typography>
              </Grid>
              <Grid item xs={2}>
                <DeleteButton
                  user={user}
                  listingUserId={listing.User.id}
                  listingId={listing.id}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  )
}

export default UserListings

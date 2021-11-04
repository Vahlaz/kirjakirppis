import {
  Accordion,
  AccordionSummary,
  Container,
  Grid,
  Typography,
  Paper,
  AccordionDetails,
} from '@material-ui/core'
import React from 'react'
import { ExpandMoreOutlined } from '@material-ui/icons'
import DeleteButton from './DeleteButton'
import { CssAccordion } from './StyledComponents'

const UserListings = ({ listings, user }) => {
  const yourListings = listings.filter((a) => a.User.id === user.id)
  if (!user) {
    return <></>
  }

  return (
    <Container className="layer3 subtitle1">
      Omat listaukset:
      {yourListings.map((listing) => (
        <CssAccordion square key={listing.id} >
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
        </CssAccordion>
      ))}
    </Container>
  )
}

export default UserListings

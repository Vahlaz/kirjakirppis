import React from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  IconButton,
} from '@material-ui/core'
import books from '../assets/books.json'
import { DeleteOutlined, ExpandMoreOutlined } from '@material-ui/icons'

const ListingText = ({ text }) => {
  return (
    <Grid item>
      <Typography variant='body1'>{text}</Typography>
    </Grid>
  )
}

const DeleteButton = ({ user, listingId }) => {
  if (!user) {
    return <> </>
  }
  if (user.id !== listingId) {
    return <> </>
  }

  return (
    <IconButton onClick={() => console.log('bruh')}>
      <DeleteOutlined />
    </IconButton>
  )
}

const ListingTable = ({ data, user }) => {
  return (
    <>
      {data.map((listing) => (
        <Accordion key={listing.id}>
          <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
            <Grid
              container
              direction='row'
              alignItems='center'
              justify='space-around'
            >
              <Grid item xs={2}>
                <img
                  src={
                    books.find((book) => book.title === listing.Title).imageLink
                  }
                  width='80'
                  alt={listing.Title}
                />
              </Grid>
              <Grid item xs={9}>
                <Typography variant='h6'>{listing.Title}</Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography variant='subtitle1'>{listing.Price}€</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container direction='row'>
              <Grid item xs={11}>
                <Grid container spacing={1} direction='column'>
                  <ListingText text={`Myyjä: ${listing.User.name}`} />
                  <ListingText text={`puh: ${listing.User.phonenumber}`} />
                  <ListingText text={`sähköposti: ${listing.User.email}`} />
                </Grid>
              </Grid>
              <Grid item xs={1}>
                <DeleteButton user={user} listingId={listing.User.id} />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  )
}
export default ListingTable

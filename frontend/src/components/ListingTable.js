import React from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Container,
} from '@material-ui/core'
import books from '../assets/books.json'
import { ExpandMoreOutlined } from '@material-ui/icons'
import DeleteButton from './DeleteButton'

const parseCondition = (condition) => {
  if (condition === 3) {
    return 'Käytettävä'
  }
  if (condition === 2) {
    return 'Hyvä'
  }
  if (condition === 1) {
    return 'Erinomainen'
  } else {
    return 'Väärin merkitty kuntoluokka'
  }
}

const ListingText = ({ text }) => {
  return (
    <Grid item>
      <Typography variant='subtitle2'>{text}</Typography>
    </Grid>
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
            <Grid container direction='row' spacing={1}>
              <Grid item xs={4}>
                <Grid container spacing={1} direction='column'>
                  <ListingText text={`Myyjä: ${listing.User.name}`} />
                  <ListingText text={`puh: ${listing.User.phonenumber}`} />
                  <ListingText text={`sähköposti: ${listing.User.email}`} />
                  <Grid item>
                    <Typography variant='subtitle2'>
                      Kunto: {parseCondition(listing.Condition)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={7}>
                <Typography variant='subtitle2'>Lisätietoa: </Typography>
                <Typography variant='body1'>{listing.Information}</Typography>
              </Grid>
              <Grid item xs={1}>
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
    </>
  )
}
export default ListingTable

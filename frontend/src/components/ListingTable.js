import React, { useState } from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@material-ui/core'
import books from '../assets/books.json'
import { ExpandMoreOutlined } from '@material-ui/icons'

const ListingTable = ({ data }) => {
  return (
    <>
      {data.map((listing) => (
        <Accordion key={listing.id}>
          <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
            <img
              src={books.find((book) => book.title === listing.Title).imageLink}
              width='80'
              alt=''
            />
            <Typography>{listing.Title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>ihaok</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  )
}
export default ListingTable

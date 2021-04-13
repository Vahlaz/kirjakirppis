import React, { useState } from 'react'
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Grid,
    TextField,
} from '@material-ui/core'
import books from '../assets/books.json'
import { ExpandMoreOutlined } from '@material-ui/icons'
import DeleteButton from './DeleteButton'
import { Autocomplete } from '@material-ui/lab'
import ListingSearch from './ListingSearch'

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
            <Typography variant='body2'>{text}</Typography>
        </Grid>
    )
}

const ListingTable = ({ data, user }) => {
    const [search, setSearch] = useState()
    const filteredListings = ListingSearch(data, search)
    return (
        <>
            <Autocomplete
                onChange={(event, newValue) => {
                    setSearch((newValue))
                }}
                options={books}
                getOptionLabel={(option) => option.title}
                margin='normal'
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label='Etsi kirja'
                        variant='outlined'
                    />
                )}
            />
            {filteredListings.map((listing) => (
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
                                    width='50'
                                    alt={listing.Title}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='subtitle1'>{listing.Title}</Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <Typography variant='subtitle2'>{listing.Price}€</Typography>
                            </Grid>
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container direction='row' spacing={2}>
                            <Grid item xs={6}>
                                <Grid container spacing={1} direction='column'>
                                    <ListingText text={`Myyjä: ${listing.User.name}`} />
                                    <ListingText text={`puh: ${listing.User.phonenumber}`} />
                                    <ListingText text={`sähköposti: ${listing.User.email}`} />

                                    <Grid item>
                                        <Typography variant='subtitle2'>
                                            Kunto: {parseCondition(listing.Condition)}
                                        </Typography>
                                        <DeleteButton
                                            user={user}
                                            listingUserId={listing.User.id}
                                            listingId={listing.id}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='subtitle2'>Lisätietoa: </Typography>
                                <Typography variant='caption'>{listing.Information}</Typography>
                            </Grid>

                        </Grid>
                    </AccordionDetails>
                </Accordion>
            ))}
        </>
    )
}
export default ListingTable

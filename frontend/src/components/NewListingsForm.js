import { useMutation } from '@apollo/client'
import {
  Container,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  MenuItem,
  Button,
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useState } from 'react'
import books from '../assets/books.json'
import { CREATE_LISTING } from './queries'

const NewListingForm = ({ user }) => {
  const [createListing] = useMutation(CREATE_LISTING, {refetchQueries: ['allListings']})
  const [condition, setCondition] = useState('')
  const [book, setBook] = useState({})
  const [information, setInformation] = useState('')
  const [price, setPrice] = useState('')
  const school = window.localStorage.getItem('KirjaKirppis-school')
  const submit = async (event) => {
    event.preventDefault()
    const newListing = {
      ...book,
      price: parseInt(price),
      condition: condition,
      information: information,
      user: user.id,
      school: school,
    }
    console.log(newListing)
    const data = await createListing({ variables: { ...newListing } })
    if (data.data.createListing) {
      console.log(data.data)
    }
  }

  if (!user)
    return (
      <Container component={Paper}>
        <Typography variant='subtitle1'>
          Kirjaudu sisään luodaksesi ilmoituksia
        </Typography>
      </Container>
    )
  return (
    <Container component={Paper}>
      <Typography variant='h6'>Luo uusi listaus</Typography>
      <form onSubmit={submit}>
        <Grid container justify='center' direction='column' spacing={1}>
          <Grid item>
            <Autocomplete
              onChange={(event, newValue) => {
                setBook(newValue)
              }}
              options={books}
              getOptionLabel={(option) => option.title}
              margin='normal'
              id='kirja'
              renderInput={(params) => (
                <TextField {...params} label='Valitse kirja'  variant="outlined"/>
              )}
            />
          </Grid>
          <Grid item>
            <TextField
              type='react-number-format'
              id='hinta'
              label='Hinta'
              onChange={(event) => setPrice(event.target.value)}
              InputProps={{
                endAdornment: <InputAdornment position='end'>€</InputAdornment>,
              }}
              style={{ minWidth: 250 }}
              variant='outlined'
            />
          </Grid>
          <Grid item>
            <TextField
              select
              id='kunto'
              label='kunto'
              value={condition}
              onChange={(event) => setCondition(event.target.value)}
              style={{ minWidth: 250 }}
              variant='outlined'
            >
              <MenuItem value={1}>Käytettävä</MenuItem>
              <MenuItem value={2}>Hyvä</MenuItem>
              <MenuItem value={3}>Erinomainen</MenuItem>
            </TextField>
          </Grid>
          <Grid item>
            <TextField
              id='informaatio'
              label='Lisätietoa kirjasta'
              multiline
              value={information}
              onChange={(event) => setInformation(event.target.value)}
              style={{ minWidth: 250 }}
              helperText='Kerro lisää kirjan kunnosta tai noutotavasta'
              variant='outlined'
            />
          </Grid>
          <Grid item>
            <Button type='submit'> uusi listaus</Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default NewListingForm

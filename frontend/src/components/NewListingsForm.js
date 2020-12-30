import { useMutation } from '@apollo/client'
import {
  Container,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  Select,
  MenuItem,
  Button,
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useState } from 'react'
import books from '../assets/books.json'
import { CREATE_LISTING } from './queries'

const NewListingForm = ({ user }) => {
  const [createListing, result] = useMutation(CREATE_LISTING)
  const [condition, setCondition] = useState('')
  const [book, setBook] = useState({})
  const [information, setInformation] = useState('')
  const [price, setPrice] = useState('')

  const submit = async (event) => {
    event.preventDefault()
    const newListing = {
      ...book,
      price: parseInt(price),
      condition: condition,
      information: information,
      user: user.id,
      school: user.school
    }
    console.log(newListing)
    const data = await createListing({ variables: { ...newListing } })
    if(data.data.createListing){
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
                <TextField {...params} label='Valitse kirja' />
              )}
            />
          </Grid>
          <Grid item>
            <TextField
              type='number'
              id='hinta'
              label='Hinta'
              onChange={(event) => setPrice(event.target.value)}
              InputProps={{
                endAdornment: <InputAdornment position='end'>€</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              id='informaatio'
              label='Lisätietoa kirjasta'
              value={information}
              onChange={(event) => setInformation(event.target.value)}
            />
          </Grid>
          <Grid item>
            <Select
              id='kunto'
              value={condition}
              onChange={(event) => setCondition(event.target.value)}
            >
              <MenuItem value={0}>Hyvä</MenuItem>
              <MenuItem value={1}>Ihan ok</MenuItem>
              <MenuItem value={2}>Huono</MenuItem>
            </Select>
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

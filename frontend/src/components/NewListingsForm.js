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
import schools from '../assets/schools.json'

const NewListingForm = ({ user }) => {
  const [createListing] = useMutation(CREATE_LISTING, {
    refetchQueries: ['allListings'],
  })
  const [condition, setCondition] = useState('')
  const [book, setBook] = useState({})
  const [information, setInformation] = useState('')
  const [price, setPrice] = useState('')
  const [school, setSchool] = useState(
    schools.find(
      (a) => a.name === window.localStorage.getItem('KirjaKirppis-school')
    )
  )
  const submit = async (event) => {
    event.preventDefault()
    const newListing = {
      ...book,
      price: parseFloat(price.replace(/,/, '.')),
      condition: condition,
      information: information,
      user: user.id,
      school: school.name,
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
                <TextField
                  {...params}
                  label='Valitse kirja'
                  variant='outlined'
                  size='small'
                />
              )}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              onChange={(event, newValue) => {
                setSchool(newValue)
              }}
              options={schools}
              getOptionLabel={(option) => option.name}
              margin='normal'
              id='school'
              defaultValue={school}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Valitse koulu'
                  variant='outlined'
                  size='small'
                />
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
              style={{ minWidth: 260 }}
              variant='outlined'
              size='small'
            />
          </Grid>
          <Grid item>
            <TextField
              select
              id='kunto'
              label='kunto'
              value={condition}
              onChange={(event) => setCondition(event.target.value)}
              style={{ minWidth: 260 }}
              variant='outlined'
              size='small'
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
              size='small'
            />
          </Grid>

          <Grid item>
            <Button type='submit' variant='outlined'>
              {' '}
              luo listaus
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default NewListingForm

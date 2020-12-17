import {
  Container,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import books from '../assets/books.json'

const NewListingForm = ({ user }) => {
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
      <form>
        <Grid container justify='center' direction='column' spacing={1}>
          <Grid item>
            <Autocomplete
              //onChange={(event, newValue) => {}}
              options={books}
              getOptionLabel={(option) => option.title}
              margin='normal'
              renderInput={(params) => (
                <TextField {...params} label='Valitse kirja' />
              )}
            />
          </Grid>
          <Grid item>
            <TextField
              type='number'
              InputProps={{
                endAdornment: <InputAdornment position='end'>€</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item>
            <TextField />
          </Grid>
          <Grid item>
            <TextField />
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default NewListingForm

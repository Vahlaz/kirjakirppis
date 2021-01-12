import { Button, Container, Grid, TextField } from '@material-ui/core'
import schools from '../assets/schools.json'
import React, { useState } from 'react'
import { Alert, Autocomplete } from '@material-ui/lab'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from './queries'

const NewUser = ({ setLoginform }) => {
  const [createUser] = useMutation(CREATE_USER)
  const defaultSchool = window.localStorage.getItem('KirjaKirppis-school')
  const [school, setSchool] = useState(
    schools.find((school) => school.name === defaultSchool)
  )
  const [errorMessage, setErrorMessage] = useState('')
  const [message, setMessage] = useState('')
  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(event.target.createName.value)
    console.log(event.target)

    const userObject = {
      name: event.target.createName.value,
      email: event.target.createEmail.value,
      phonenumber: event.target.createPhoneNumber.value,
      password: event.target.createPassword.value,
      school: school.name,
    }
    try {
      await createUser({ variables: { ...userObject } })
      setMessage('käyttäjä luotu')
      setTimeout(() => {
        setMessage('')
        setLoginform(true)
      }, 3000)
    } catch (error) {
      setErrorMessage(error.message)
      setTimeout(() => setErrorMessage(''), 3000)
    }
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid container justify='center' direction='column'>
          <Grid item>
            <TextField id='createName' label='Nimi'></TextField>
          </Grid>
          <Grid item>
            <TextField id='createEmail' label='Sähköposti'></TextField>
          </Grid>
          <Grid item>
            <TextField
              id='createPhoneNumber'
              label='Puhelin numero'
            ></TextField>
          </Grid>
          <Grid item>
            <TextField
              multiline
              id='createInformation'
              label='Tietoa sinusta'
            ></TextField>
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
                <TextField {...params} label='Valitse koulu' />
              )}
            />
          </Grid>
          <Grid item>
            <TextField id='createPassword' label='salasana'></TextField>
          </Grid>
          <Grid item>
            <Button type='submit'>luo käyttäjä</Button>
          </Grid>

          {errorMessage ? <Alert severity='error'>{errorMessage}</Alert> : null}
          {message ? <Alert severity='success'>{message}</Alert> : null}
        </Grid>
      </form>
    </Container>
  )
}

export default NewUser

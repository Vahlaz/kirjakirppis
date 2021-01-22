import { Button, Grid, TextField } from '@material-ui/core'
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
    <form onSubmit={handleSubmit}>
      <Grid
        container
        justify='center'
        direction='column'
        spacing={1}
        alignItems='center'
      >
        <Grid item>
          <TextField
            required
            id='createName'
            label='Nimi'
            style={{ minWidth: 250 }}
            variant='outlined'
            size='small'
            onInvalid={(event) => {
              event.target.setCustomValidity(' ')
            }}
            onInput={(event) => {
              event.target.setCustomValidity('')
            }}
          ></TextField>
        </Grid>
        <Grid item>
          <TextField
            id='createEmail'
            label='Sähköposti'
            style={{ minWidth: 250 }}
            variant='outlined'
            size='small'
            required
            onInvalid={(event) => {
              event.target.setCustomValidity(' ')
            }}
            onInput={(event) => {
              event.target.setCustomValidity('')
            }}
          ></TextField>
        </Grid>
        <Grid item>
          <TextField
            id='createPhoneNumber'
            label='Puhelinnumero'
            style={{ minWidth: 250 }}
            variant='outlined'
            size='small'
            required
            onInvalid={(event) => {
              event.target.setCustomValidity(' ')
            }}
            onInput={(event) => {
              event.target.setCustomValidity('')
            }}
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
              <TextField
                {...params}
                label='Valitse koulu'
                style={{ minWidth: 250 }}
                variant='outlined'
                size='small'
                required
                onInvalid={(event) => {
                  event.target.setCustomValidity(' ')
                }}
                onInput={(event) => {
                  event.target.setCustomValidity('')
                }}
              />
            )}
          />
        </Grid>
        <Grid item>
          <TextField
            id='createPassword'
            label='salasana'
            style={{ minWidth: 250 }}
            variant='outlined'
            size='small'
            required
            onInvalid={(event) => {
              event.target.setCustomValidity(' ')
            }}
            onInput={(event) => {
              event.target.setCustomValidity('')
            }}
          ></TextField>
        </Grid>
        <Grid item>
          <Button type='submit' variant='outlined' color='primary'>
            luo käyttäjä
          </Button>
        </Grid>

        {errorMessage ? <Alert severity='error'>{errorMessage}</Alert> : null}
        {message ? <Alert severity='success'>{message}</Alert> : null}
      </Grid>
    </form>
  )
}

export default NewUser

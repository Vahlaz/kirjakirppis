import { Button, Grid, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from './queries'
import { Alert } from '@material-ui/lab'

const LoginForm = ({ setUser }) => {
  const [login] = useMutation(LOGIN)
  const [errormessage, setErrormessage] = useState('')
  const [emailInvalid, setEmailInvalid] = useState(false)
  const [passwordInvalid, setPasswordInvalid] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    try {
      const data = await login({
        variables: {
          email,
          password,
        },
      })
      if (data.data.login) {
        const { token } = data.data.login
        localStorage.setItem('KirjaKirppis-user-token', token)
        setUser(data.data.login.user)
      }
    } catch (error) {
      setErrormessage(error.message)
      setTimeout(() => setErrormessage(''), 3000)
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
            error={emailInvalid}
            required
            id='email'
            label='sähköposti'
            variant='outlined'
            size='small'
            style={{ minWidth: 250 }}
            onInvalid={(event) => {
              setEmailInvalid(true)
              event.target.setCustomValidity(' ')
            }}
            onInput={(event) => {
              setEmailInvalid(false)
              event.target.setCustomValidity('')
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            error={passwordInvalid}
            required
            id='password'
            label='salasana'
            variant='outlined'
            type='password'
            size='small'
            style={{ minWidth: 250 }}
            onInvalid={(event) => {
              setPasswordInvalid(true)
              event.target.setCustomValidity(' ')
            }}
            onInput={(event) => {
              setPasswordInvalid(false)
              event.target.setCustomValidity('')
            }}
          />
        </Grid>
        <Grid item>
          {errormessage ? <Alert severity='error'>{errormessage}</Alert> : null}
        </Grid>
        <Grid item>
          <Button type='submit' variant='outlined' color='primary'>
            Kirjaudu sisään
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default LoginForm

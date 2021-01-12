import { Button, Grid, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from './queries'
import { Alert } from '@material-ui/lab'

const LoginForm = ({ setUser }) => {
  const [login] = useMutation(LOGIN)
  const [errormessage, setErrormessage] = useState('')

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
      <Grid container justify='center' direction='column'>
        <TextField
          required
          id='email'
          label='sähköposti'
          variant='outlined'
          style={{ padding: 2 }}
        />
        <TextField
          required
          id='password'
          label='Salasana'
          variant='outlined'
          type='password'
          style={{ padding: 2 }}
        />
        <Button
          type='submit'
          style={{ padding: 2 }}
          variant='outlined'
          size='medium'
          color='primary'
        >
          Kirjaudu sisään
        </Button>
        {errormessage ? <Alert severity='error'>{errormessage}</Alert> : null}
      </Grid>
    </form>
  )
}

export default LoginForm

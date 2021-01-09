import { Button, Grid, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from './queries'
import { Alert } from '@material-ui/lab'
import { Link } from 'react-router-dom'

const LoginForm = () => {
  const [login, { result }] = useMutation(LOGIN)
  const [errormessage, setErrormessage] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    try {
      const data = await login({
        variables: {
          username,
          password,
        },
      })
      if (data.data.login) {
        const { token, username, id } = data.data.login
        localStorage.setItem('KirjaKirppis-user-token', token)
        console.log(username)
      }
    } catch (event) {
      console.log('kirjautuminen epäonnistui')
      setErrormessage('Salasana tai käyttäjänimi väärin')
      setTimeout(() => setErrormessage(''), 3000)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container justify='center' direction='column'>
        <TextField
          id='username'
          label='Käyttäjänimi'
          variant='outlined'
          style={{ padding: 2 }}
        />
        <TextField
          id='password'
          label='Salasana'
          variant='outlined'
          type='password'
          style={{ padding: 2 }}
        />
        <Button type='submit' style={{ padding: 2 }} variant='outlined'>
          Kirjaudu sisään
        </Button>
        {errormessage ? <Alert severity='error'>{errormessage}</Alert> : null}
      </Grid>
    </form>
  )
}

export default LoginForm

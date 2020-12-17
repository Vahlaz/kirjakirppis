import { Button, Grid, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from './queries'

const LoginForm = () => {
  const [login, { result }] = useMutation(LOGIN)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    const data = await login({
      variables: {
        username,
        password,
      },
    })
    if (data.error) {
      console.log(data.error)
    }

    if (data.data.login) {
      const { token, username, id } = data.data.login
      console.log(username, id)
      localStorage.setItem('KirjaKirppis-user-token', token)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container justify='center' direction='column'>
        <TextField id='username' label='Käyttäjänimi' variant='outlined' style={{ padding: 2 }}/>
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
      </Grid>
    </form>
  )
}

export default LoginForm

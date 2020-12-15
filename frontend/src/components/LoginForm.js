import { Button, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from './queries'

const LoginForm = () => {
  const [login, { result }] = useMutation(LOGIN)

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(event.target.username.value)
    const username = event.target.username.value
    const password = event.target.password.value
    const data = await login({
      variables: {
        username,
        password,
      },
    })
    console.log(result)
    console.log(data)
    if (data.data.login) {
      const { token, username, id } = data.data.login
      console.log(username, id)
      localStorage.setItem('KirjaKirppis-user-token', token)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant='h6'>Kirjaudu sisään</Typography>
      <TextField id='username' label='Käyttäjänimi' variant='outlined' />
      <TextField id='password' label='Password' variant='outlined' />
      <Button type='submit' style={{ padding: 10 }}>
        Kirjaudu sisään
      </Button>
    </form>
  )
}

export default LoginForm

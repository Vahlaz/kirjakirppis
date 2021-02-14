import { Button, Grid, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from './queries'
import { Alert } from '@material-ui/lab'

const LoginForm = ({ setUser }) => {
  const [login] = useMutation(LOGIN)
  const [errormessage, setErrormessage] = useState('')
  const [errors, setErrors] = useState([])
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = async (event) => {
    event.preventDefault()
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
      if (error.networkError) {
        setErrors(error.networkError.result.errors.map(e => e.message))
        setErrormessage(error.networkError.result.errors.map(e => e.message ))
      }
      if(!error.networkError){
        setErrormessage(error.message)
      }
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
            error={errors.includes('Sähköposti on pakollinen. ')}
            id='email'
            label='sähköposti'
            variant='outlined'
            size='small'
            style={{ minWidth: 250 }}
            onChange={(event) => {
              setErrors([])
              setEmail(event.target.value)
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            error={errors.includes('Salasana on pakollinen. ')}
            id='password'
            label='salasana'
            variant='outlined'
            type='password'
            size='small'
            style={{ minWidth: 250 }}
            onChange={(event) => {
              setErrors([])
              setPassword(event.target.value)
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

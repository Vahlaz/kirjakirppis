import React, { useState } from 'react'
import LoginForm from './LoginForm.js'
import FaceOutlinedIcon from '@material-ui/icons/FaceOutlined'
import { useApolloClient } from '@apollo/client'
import NewUser from './NewUser.js'
import { Container, Paper, Grid, Button, Typography } from '@material-ui/core'

const UserWindow = ({ setUser, user }) => {
  const [loginform, setLoginform] = useState(true)
  const client = useApolloClient()

  const handleLogout = (event) => {
    event.preventDefault()
    localStorage.removeItem('KirjaKirppis-user-token')
    client.clearStore()
    setUser()
    console.log(user)
  }

  if (!user) {
    return (
      <Container component={Paper}>
        <Grid container justify='center' spacing={1}>
          <Grid item>
            {loginform ? (
              <LoginForm setUser={setUser} />
            ) : (
              <NewUser setLoginform={setLoginform} />
            )}
          </Grid>
          <Grid item>
            <Button
              onClick={(event) => {
                event.preventDefault()
                setLoginform(!loginform)
              }}
              variant='outlined'
              color='secondary'
              size='small'
            >
              {loginform ? 'luo uusi käyttäjä' : 'kirjaudu sisään'}
            </Button>
          </Grid>
        </Grid>
      </Container>
    )
  }

  return (
    <Container component={Paper} align='center'>
      <Grid container justify='center' alignitems='center' direction='column'>
        <Grid item>
          <FaceOutlinedIcon fontSize='large' />
        </Grid>
        <Grid item>
          <Typography variant='body1'>{user.name}</Typography>
        </Grid>
        <Grid item>
          <Typography variant='body1'>{user.phonenumber}</Typography>
        </Grid>
        <Grid item>
          <Typography variant='body1'>{user.email}</Typography>
        </Grid>
      </Grid>
      <Button onClick={handleLogout} variant="outlined" color="secondary">kirjaudu ulos</Button>
    </Container>
  )
}

export default UserWindow

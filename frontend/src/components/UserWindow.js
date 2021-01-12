import {
  Container,
  Paper,
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Button,
} from '@material-ui/core'
import React, { useState } from 'react'
import LoginForm from './LoginForm.js'
import FaceOutlinedIcon from '@material-ui/icons/FaceOutlined'
import { useApolloClient } from '@apollo/client'
import NewUser from './NewUser.js'

const UserWindow = ({ setUser, user }) => {
  const [loginform, setLoginform] = useState(true)
  const client = useApolloClient()
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
                console.log(loginform)
              }}
              variant='outlined'
              color='secondary'
              size="small"
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
      <Grid container justify='center'>
        <FaceOutlinedIcon fontSize='large' />
        <TableContainer>
          <Table size='small'>
            <TableBody>
              <TableRow>
                <TableCell align='center'> {user.name} </TableCell>
                <TableCell align='center'> </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='center'>{user.phonenumber}</TableCell>
                <TableCell align='center'>{user.email}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Button
        onClick={() => {
          localStorage.removeItem('KirjaKirppis-user-token')
          setUser()
          client.clearStore()
        }}
      >
        kirjaudu ulos
      </Button>
    </Container>
  )
}

export default UserWindow

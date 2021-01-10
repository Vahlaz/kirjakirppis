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
import React from 'react'
import LoginForm from './LoginForm.js'
import FaceOutlinedIcon from '@material-ui/icons/FaceOutlined'
import { useApolloClient } from '@apollo/client'

const UserWindow = ({ setUser, user }) => {
  const client = useApolloClient()
  if (!user) {
    return (
      <Container component={Paper}>
        <LoginForm setUser={setUser} />
      </Container>
    )
  }

  return (
    <Container component={Paper} align='center'>
      {console.log(user)}
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

import {
  Container,
  Paper,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from '@material-ui/core'
import React from 'react'
import LoginForm from './LoginForm.js'
import FaceOutlinedIcon from '@material-ui/icons/FaceOutlined';const UserWindow = ({ token, user }) => {
  if (!token) {
    return (
      <Container component={Paper}>
        <LoginForm />
      </Container>
    )
  }

  return (
    <Container component={Paper} align='center'>
      <Grid container justify='center'>
        <FaceOutlinedIcon fontSize="large"/>
        <TableContainer>
          <Table size='small'>
            <TableBody>
              <TableRow>
                <TableCell align="center"> {user.name} </TableCell>
                <TableCell align="center"> {user.username}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">{user.phonenumber}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <button
        onClick={() => {
          localStorage.removeItem('KirjaKirppis-user-token')
        }}
      >
        kirjaudu ulos
      </button>
    </Container>
  )
}

export default UserWindow

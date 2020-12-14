import React, { useState } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { Box, Collapse, IconButton, Paper, Typography } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { makeStyles } from '@material-ui/core/styles'

const ListingTable = ({ data }) => {
  const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
        
      },
    },
  })
  const classes = useRowStyles()

  const SingleRow = ({ listing }) => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <TableRow key={listing.id} className={classes.root}>
          <TableCell>
            <Typography variant='subtitle1'>{listing.Title}</Typography>
          </TableCell>
          <TableCell>{listing.Subject}</TableCell>
          <TableCell>{listing.Condition}</TableCell>
          <TableCell align='right'>{listing.Price}€</TableCell>
          <TableCell>
            <IconButton aria-label='expand row' onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Box margin={1}>
                <Table size='small' aria-label='listing information'>
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{listing.Information}</TableCell>
                      <TableCell align='right'>
                        <h4>Myyjä:</h4>
                      </TableCell>
                      <TableCell align='right'>{listing.User.name}</TableCell>
                      <TableCell align='right'>
                        puh.{listing.User.phonenumber}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table className={'table'} aria-label='Uusimmat ilmoitukset'>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant='h6'>Kirja</Typography>
            </TableCell>
            <TableCell>
              <Typography variant='h6'>Aine</Typography>
            </TableCell>
            <TableCell>
              <Typography variant='h6'>Kunto</Typography>
            </TableCell>
            <TableCell align='right'>
              <Typography variant='h6'>Hinta</Typography>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((listing) => (
            <SingleRow listing={listing} key={listing.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default ListingTable

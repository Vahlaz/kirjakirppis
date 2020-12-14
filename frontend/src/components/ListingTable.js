import React, { useState } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { Box, Collapse, IconButton, Typography } from '@material-ui/core'
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
          <TableCell>{listing.Title}</TableCell>
          <TableCell>{listing.Subject}</TableCell>
          <TableCell>{listing.Condition}</TableCell>
          <TableCell align='right'>{listing.Price}€</TableCell>
          <TableCell>
            <IconButton
              aria-label='expand row'
              size='normal'
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Box margin={1}>
                <Typography variant='h6'>Lisätietoa</Typography>
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
                    <TableCell>{listing.Information}</TableCell>
                    <TableCell><h4>Myyjä:</h4></TableCell>
                    <TableCell>{listing.User.name}</TableCell>
                    <TableCell>puh.{listing.User.phonenumber}</TableCell>
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
    <TableContainer>
      <Table className={'table'} aria-label='Uusimmat ilmoitukset'>
        <TableHead>
          <TableRow>
            <TableCell>Kirja:</TableCell>
            <TableCell>Aine:</TableCell>
            <TableCell>Kunto:</TableCell>
            <TableCell align='right'>Hinta</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((listing) => (
            <SingleRow listing={listing} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default ListingTable

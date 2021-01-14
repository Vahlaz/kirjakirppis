import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@material-ui/core'
import { DeleteOutlined } from '@material-ui/icons'
import { REMOVE_LISTING } from './queries'
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Alert } from '@material-ui/lab'

const DeleteButton = ({ user, listingId, listingUserId }) => {
  const [open, setOpen] = useState(false)
  const [removeListing] = useMutation(REMOVE_LISTING, {
    refetchQueries: ['allListings'],
  })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const handleYes = async () => {
    const data = await removeListing({ variables: { id: listingId } })

    if (data.data.removeListing) {
      setMessage('Ilmoitus poistettu')
    }
    if (data.error) {
      setError('Ongelma ilmoituksen poistossa')
      console.log(data.error)
      setTimeout(() => setError(''), 3000)
    }
  }

  const handleClick = () => {
    setOpen(!open)
  }

  const handleClose = () => {
    setOpen(false)
  }

  if (!user) {
    return <> </>
  }
  if (user.id !== listingUserId) {
    return <> </>
  }

  return (
    <>
      <IconButton onClick={handleClick}>
        <DeleteOutlined />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Haluatko varmasti poistaa ilmoituksen?</DialogTitle>
        <DialogContent>
          {message ? <Alert severity='success'>{message}</Alert> : null}
          {error ? <Alert severity='success'>{error}</Alert> : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleYes}>Kyllä</Button>
          <Button onClick={() => setOpen(!open)}>En</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteButton

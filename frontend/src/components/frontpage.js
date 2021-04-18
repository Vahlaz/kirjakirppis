import schools from '../assets/schools.json'
import SearchDropDown from './searchDropDown'
import React from 'react'
import { Typography } from '@material-ui/core'

const FrontPage = ({ changeSchool }) => {
  return (
    <div>
      <Typography variant="h4"> Kirja Kirppis</Typography>
      <Typography variant="subtitle1"> Aloita valitsemalla koulusi</Typography>

      <SearchDropDown options={schools} onChangeFunction={changeSchool} />
    </div>
  )
}

export default FrontPage

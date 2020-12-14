import schools from './assets/schools.json'
import SearchDropDown from './searchDropDown'
import React from 'react'

const FrontPage = ({ changeSchool }) => {
  return (
    <div>
      <SearchDropDown options={schools} onChangeFunction={changeSchool} />
    </div>
  )
}

export default FrontPage

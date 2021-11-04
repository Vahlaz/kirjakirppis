import schools from '../assets/schools.json'
import SearchDropDown from './searchDropDown'
import React from 'react'

const FrontPage = ({ changeSchool }) => {

  return (
    <div className="App">
      <h1 className="header1">
        Kirja Kirppis
      </h1>
      <p className="subtitle1">
        Aloita valitsemalla koulusi
        <SearchDropDown options={schools} onChangeFunction={changeSchool} />
      </p>
    </div>
  )
}

export default FrontPage

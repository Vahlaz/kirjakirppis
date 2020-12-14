import { useQuery } from '@apollo/client'
import { ALL_LISTINGS } from './queries'
import schools from './assets/schools.json'
import SearchDropDown from './searchDropDown'
import React from 'react'

const FrontPage = ({changeSchool}) => {
  
  const listing = useQuery(ALL_LISTINGS, {
    variables: { school: 'Viikin Normaalikoulu' },
  })

  if (listing.loading) {
    return null
  }

  console.log(listing)
  return (
    <div>
      <SearchDropDown
        options={schools}
        onChangeFunction={changeSchool}
      />
    </div>
  )
}

export default FrontPage

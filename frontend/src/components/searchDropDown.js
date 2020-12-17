import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

const SearchDropDown = ({ options, onChangeFunction }) => {
  const [value, setValue] = useState('')
  
  return (
    <div className='search-box'>
      <div>
        <Autocomplete
          onChange={(event, newValue) => {
            setValue(newValue)
            onChangeFunction(newValue)
          }}
          options={options}
          getOptionLabel={(option) => option.name}
          margin='normal'
          renderInput={(params) => (
            <TextField
              {...params}
              label='Etsi ja valitse koulu'
              variant='outlined'
            />
          )}
        />
      </div>
    </div>
  )
}

export default SearchDropDown

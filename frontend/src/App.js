import { Box, Container, Paper } from '@material-ui/core'
import React, { useState } from 'react'
import FrontPage from './components/frontpage'
import SchoolFrontPage from './components/schoolFrontPage'
import MobileSchoolFrontPage from './components/MobileSchoolFrontPage'
import './App.css'

const App = () => {
  const [school, setSchool] = useState(
    window.localStorage.getItem('KirjaKirppis-school')
  )
  const changeSchool = (value) => {
    window.localStorage.setItem('KirjaKirppis-school', value.name)
    setSchool(value.name)
  }

  if (window.innerWidth <= 770) {
    return (
      <div>
        <Box component={Paper}>
          <Container>
            {school ? (
              <MobileSchoolFrontPage setSchool={setSchool} />
            ) : (
              <FrontPage changeSchool={changeSchool} />
            )}
          </Container>
        </Box>
      </div>
    )
  }

  return (
    <div>
      <Box component={Paper}>
        <Container>
          {school ? (
            <SchoolFrontPage setSchool={setSchool} />
          ) : (
            <FrontPage changeSchool={changeSchool} />
          )}
        </Container>
      </Box>
    </div>
  )
}

export default App

import { Container, Paper } from '@material-ui/core'
import React, { useState } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import FrontPage from './components/frontpage'
import SchoolFrontPage from './components/schoolFrontPage'

const App = () => {
  const history = useHistory()
  if (window.localStorage.getItem('KirjaKirppis-school')) {
    const schoolurl = window.localStorage
      .getItem('KirjaKirppis-school')
      .replace(/\s/g, '')
    history.push(`/school/${schoolurl}`)
  }

  const changeSchool = (value) => {
    window.localStorage.setItem('KirjaKirppis-school', value.name)
    const schoolurl = value.name.replace(/\s/g, '')
    history.push(`/school/${schoolurl}`)
  }

  return (
    <div>
      <Container maxWidth='md'>
        <Switch>
          <Route path='/school/:name'>
            <SchoolFrontPage />
          </Route>
          <Route path='/'>
            <Paper>
              <FrontPage changeSchool={changeSchool} />
            </Paper>
          </Route>
        </Switch>
      </Container>
    </div>
  )
}

export default App

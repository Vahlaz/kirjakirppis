import { Container, Grid, Paper } from '@material-ui/core'
import React, { useState } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import FrontPage from './components/frontpage'
import SchoolFrontPage from './components/schoolFrontPage'
import './App.css'

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
      <Container component={Paper} style={{ height: '100vh' }} >
        <Switch>
          <Route path='/school/:name'>
            <SchoolFrontPage />
          </Route>
          <Route path='/'>
            <FrontPage changeSchool={changeSchool} />
          </Route>
        </Switch>
      </Container>
    </div>
  )
}

export default App

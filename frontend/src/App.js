import { Container, Paper } from '@material-ui/core'
import React from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import FrontPage from './components/frontpage'
import SchoolFrontPage from './components/schoolFrontPage'
import './App.css'

const App = () => {
  const history = useHistory()
  if (window.localStorage.getItem('KirjaKirppis-school')) {
    history.push(`/school`)
  }

  const changeSchool = (value) => {
    window.localStorage.setItem('KirjaKirppis-school', value.name)
    history.push(`/school`)
  }

  if (!window.localStorage.getItem('KirjaKirppis-school')) {
    history.push(`/`)
  }

  return (
    <div>
      <Container component={Paper}>
        <Switch>
          <Route path='/school'>
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

import React from 'react'
import TodoList from './TodoList'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Tab, Tabs } from '@mui/material'

function App() {

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Container maxWidth='xl'>
      <CssBaseline />
      <Tabs value={value} onChange={handleChange} aria-label="navi">
        <Tab label="Home" value="1" />
        <Tab label="Todos" value="2" />
      </Tabs>
      {value === '1' && (
        <div>
          <Typography variant='h3' >
            Tervetuloa MyTodos-sovellukseen!
          </Typography>
        </div>
      )}
      {value === '2' && <TodoList />}
    </Container>
  )
}

export default App
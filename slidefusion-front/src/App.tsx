import { Box } from '@mui/material'
import Home from './components/views/Home/Home'
import Header from './components/layout/Header/Header'

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Home />
      </Box>
    </Box>
  )
}

export default App

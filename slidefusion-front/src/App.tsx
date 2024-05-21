import { Box } from '@mui/material'
import Home from './components/views/Home/Home'
import Header from './components/layout/Header/Header'
import Sidebar from './components/layout/Sidebar/Sidebar'
import MainContent from './components/layout/MainContent/MainContent'

function App() {

  return (
    <Box sx={{display: 'flex'}}>
      <Header />
      <Sidebar/>
      <MainContent />
    </Box>
  )
}

export default App

import { Box } from "@mui/material"
import Sidebar from "../../layout/Sidebar/Sidebar"
import MainContent from "../../layout/MainContent/MainContent"

type Props = {}

export default function Home({}: Props) {
  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <Sidebar />
      <MainContent />
    </Box>
  )
}

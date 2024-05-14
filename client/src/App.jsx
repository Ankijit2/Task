import { Container, Paper, Typography } from '@mui/material';
import TableData from './Component/Table';
import Search from './Component/Search';



function App() {
  return (
    
      <Container component={"section"} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 , minHeight: "100vh"}} >
        <Paper elevation={3}> <TableData/></Paper>
       
      </Container>
   
  )
}

export default App
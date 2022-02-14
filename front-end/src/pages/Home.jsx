import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DebtorsList from '../components/DebtorsList';
import AddDebtorDialog from '../components/AddDebtorDialog';
import axios from "../api"


function Home() {
  const [open, setOpen] = useState(false)
  const onClose = () => setOpen(false);

  const [debtors, setDebtors] = useState([]);
  const getDebtors = () => {
    axios.get("/debtors")
          .then(({data}) => setDebtors(data))
          .catch(err => console.log(err))
  }
  useEffect(() => {
    getDebtors();
  }, [])
  return (
    <>
      <Navbar />
      <Container fixed>
        <Typography variant="h3" component="h3" gutterBottom sx={{ my: 6 }}>
          Debts Tracker
        </Typography>
      </Container>
      <DebtorsList debtors={debtors} getDebtors={getDebtors} />
      <AddDebtorDialog open={open} onClose={onClose} getDebtors={getDebtors} />
      <Fab color="primary" aria-label="add" sx={{ position: "fixed", right: 16, bottom: 16 }} onClick={() => setOpen(true)}>
        <AddIcon />
      </Fab>
    </>
  )
}

export default Home

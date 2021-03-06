import React , { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Debtslist from '../components/Debtslist';
import axios from '../api';
import { useParams } from 'react-router';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import AddDebtDialog from '../components/AddDebtDialog';
import { calcTotal } from '../calcs';



function DebtorShow() {
    const [open, setOpen] = useState(false)
    const onClose = () => setOpen(false);
    const {id}=useParams()
    const [debtor, setDebtor] = useState({})
    const getDebtor = () => {
        axios.get(`/debtors/${id}`)
        .then(({data}) => setDebtor(data))
        .catch(err => console.log(err))
    }
    useEffect(() => {
        getDebtor();
    },[])
    return (
        <>
            <Navbar goBack />
            <Container fixed>
                <Typography variant="h3" component="h3" gutterBottom sx={{ my: 6 }}>
                    {debtor?.name}
                </Typography>
            </Container>
            {debtor.debts && <Debtslist debts={debtor.debts} getDebtor={getDebtor} />}
            <Container fixed>
                {debtor.debts && (
                    <Typography variant="h5" component="h5" gutterBottom sx={{ my: 6 }}>
                        Total debts {calcTotal(debtor.debts)}dh
                    </Typography>
                )}

            </Container>
            <AddDebtDialog open={open} onClose={onClose} debtor_id={id} getDebtor={getDebtor} />
            <Fab color="primary" aria-label="add" sx={{ position: "fixed", right: 16, bottom: 16 }} onClick={() => setOpen(true)}>
                <AddIcon />
            </Fab>
        </>
    )
}

export default DebtorShow

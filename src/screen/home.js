import React, { useState, useEffect } from 'react';
import { Typography, Box, makeStyles, TextField } from '@material-ui/core'
import axios from 'axios'

import Table from '../components/table'

const useStyles = makeStyles((theme) => ({
    main: {
        minHeight: '85vh',
        borderRadius: '8px',
        background: 'white'
    },
    tableHeader: {
        display: 'flex',
        marginBottom:20,
        padding: 20
    },
    fieldText: {
        marginLeft: 'auto'
    },
    userDetile: {
        backgroundColor: 'white',
        height: '100vh'
    }
}))

export default function Home() {
    const classes = useStyles();
    const [users, setUsers] = useState([])
    const [gender, setGender] = useState('')
    const [nationality, setNationality] = useState('')

    useEffect(() => {
        axios.get('https://randomuser.me/api?results=8').then(res => {
            setUsers(res.data.results)
        })
    }, [])

    const Gender = (e) => {
        if (e.keyCode == 13) {
            axios.get(`https://randomuser.me/api?results=8&gender=${e.target.value}`).then(res => {
                setUsers(res.data.results)
            })
            setGender('')
        }
    }

    const Nationality = (e) => {
        if (e.keyCode == 13) {
            axios.get(`https://randomuser.me/api?results=8&nat=${e.target.value}`).then(res => {
                setUsers(res.data.results)
            })
            setNationality('')
        }
    }

    return (
        <Box boxShadow={2} className={classes.main}>
            <div className={classes.tableHeader}>
                <Typography variant={'h6'} >All Users</Typography>
                <div className={classes.fieldText}>
                    <TextField label="Gender" variant="outlined" size='small' style={{ marginRight: 10 }} onKeyDown={Gender} value={gender} onChange={(e) => { setGender(e.target.value) }} />
                    <TextField label="Nationality" variant="outlined" size='small' onKeyDown={Nationality} value={nationality} onChange={(e) => { setNationality(e.target.value) }} />
                </div>
            </div>

            <Table data={users} />

        </Box>

    )
}

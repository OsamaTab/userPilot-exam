import React, { useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import { Typography } from '@material-ui/core';
import Moment from 'moment';
import { useHistory } from 'react-router-dom';
import axios from 'axios'

const columns = [
    { id: 'User', label: 'User', minWidth: 280 },
    {
        id: 'Contact',
        label: 'Contact Information',
        minWidth: 150,
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'Registration',
        label: 'Registration Date',
        minWidth: 150,
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'Country',
        label: 'Country/Post Code',
        minWidth: 150,
        format: (value) => value.toFixed(2),
    },
];

const useStyles = makeStyles({
    root: {
        width: '100%',
        boxShadow: "none"
    },
    container: {
        maxHeight: '100%',
    },
    colom: {
        display: 'flex',
        paddingLeft:50,
        paddingTop:20,
        paddingBottom:20
    },
    row: {
        display: 'block',
        marginLeft:20,
    },
    gray: {
        color:'#aaa',
    }
});

export default function StickyHeadTable({data}) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(8);
    const [users, setUsers] = useState([])
    let history = useHistory();
    
    useEffect(() => {
        if(data[0]){
            setUsers(data)
        }
    }, [data[0]])

    const handleChangePage = (event, newPage) => {
        axios.get(`https://randomuser.me/api?results=8&page=${newPage+1}`).then(res => {
            setUsers(res.data.results)
        })
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    
    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container} >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead >
                        <TableRow >
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, background: 'white', paddingLeft: 40, paddingRight: 40 }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user,index) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={index} onClick={()=>{history.push(`/users/${Math.random().toString(36).substr(2, 10)}`)}}>
                                    <TableCell key={'User'} className={classes.colom}>
                                        <Avatar src={user.picture.thumbnail} style={{ height: 44, width: 44 }} />
                                        <div className={classes.row}>
                                            <Typography variant={'body1'}>{user.name.first} {user.name.last}</Typography>
                                            <Typography className={classes.gray} variant={'caption'}>{user.location.street.number} {user.location.street.name} {user.location.city} {user.location.state} {user.location.country} {user.location.postcode}</Typography>
                                        </div>
                                    </TableCell>
                                    <TableCell key={'Contact'} >
                                        <div className={classes.row}>
                                            <Typography variant={'body1'}>{user.email}</Typography>
                                            <Typography className={classes.gray} variant={'caption'} style={{paddingRight:60}}>{user.phone}</Typography>
                                        </div>
                                    </TableCell>
                                    <TableCell key={'Registration'}  >
                                        <div className={classes.row}>
                                            <Typography variant={'body1'}>{Moment(user.registered.date).format('yy MM DD')}</Typography>
                                            <Typography className={classes.gray} variant={'caption'} style={{paddingRight:25}}>{Moment(user.registered.date).format('hh:mm A')}</Typography>
                                        </div>
                                    </TableCell>
                                    <TableCell key={'Country'}>
                                        <div className={classes.row} style={{paddingRight:50}}>
                                            <Typography variant={'body1'}>{user.location.country}</Typography>
                                            <Typography className={classes.gray} variant={'caption'} >{user.location.postcode}</Typography>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[8, 16, 24]}
                component="div"
                count={5000}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
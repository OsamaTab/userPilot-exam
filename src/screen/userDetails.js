import React, { useState, useLayoutEffect } from 'react'
import SlidingPanel from 'react-sliding-side-panel';
import 'react-sliding-side-panel/lib/index.css';
import { Typography, makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    userDetile: {
        backgroundColor: 'white',
        height: '100vh',
        textAlign: 'center'
    },
    header: {
        backgroundColor: 'blue',
        height: '20vh',
    },
    avatar:{
        height: 150, width: 150 ,marginLeft:'auto',marginRight:'auto',marginTop:-75,marginBottom:20
    }

}))

export default function UserDetails() {
    const classes = useStyles();
    let history = useHistory();
    const [user, setUser] = useState([])

    useLayoutEffect(() => {
        fitch()
    }, [])

    const fitch = async () => {
        await axios.get('https://randomuser.me/api').then(res => {
            setUser(res.data.results)
        })
    }

    return (
        <div>
            <SlidingPanel
                type={'right'}
                isOpen={true}
                size={35}
                backdropClicked={() => history.push('/')}
            >
                <div className={classes.userDetile}>
                    <div className={classes.header}></div>
                    {user[0] ? <>
                        <Avatar src={user[0].picture.large} className={classes.avatar} />
                        <Typography style={{marginBottom:10}} variant={'h5'}>{user[0].name.first} {user[0].name.last}</Typography>
                        <Typography variant={'body2'}>{user[0].location.street.number} {user[0].location.street.name} {user[0].location.city} {user[0].location.state} {user[0].location.country} {user[0].location.postcode}</Typography>
                    </> : <></>}

                </div>
            </SlidingPanel>
        </div>
    )
}

import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import './style.css';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    licolor: {
        color: 'white',
    },
}));

export default function TopNavbar(props) {
    const classes = useStyles();
    const [name, setName] = useState("Login");
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        if (props.user !== undefined) {
            console.log('propsTopnavbar', props);
            setFlag(props.user.isLoggedIn)
            setName("Sign Out");
        }
    },[props])

    return (
        <div className="nav-bg-color">
            <div className={classes.root}>
                <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
                    <Toolbar>

                        <IconButton edge="start" className={classes.menuButton} onClick={props.handleDrowerOpen} color="inherit" aria-label="Menu">

                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Helpy
                        </Typography>
                        <Typography variant="h6" >
                            {flag ? `Hello ${props.user.userName}` : null}
                        </Typography>

                        <NavLink to="/login" activeClassName={classes.licolor} activeStyle={{ color: 'white' }}>{name}</NavLink>
                        <img className="nav-bar-logo" src={require('../../Images/logo.png')} alt="none" />
                    </Toolbar>
                </AppBar>

            </div>
        </div>
    )
}
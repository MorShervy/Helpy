import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
        justifyContent:'center',
        alignItems:'center',
        height: 100,
    },
});

export default function BottomNavbar() {
    const classes = useStyles();
    return (

        <div className={classes.root}>
            <AppBar position="fixed" color="default" className={classes.appBar}>
                <Toolbar >
                    <Typography  variant="h6" color="inherit" >
                        Copyright © 2019, Helpy
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>


    );
}
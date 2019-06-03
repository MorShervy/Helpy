import React, { useState, useEffect } from 'react';


import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

import PicNavbar from '../../components/navbars/PicNavbar.jsx';
import TopNavbar from '../../components/navbars/TopNavbar.jsx';
import BottomNavbar from '../../components/navbars/BottomNavbar.jsx';
import Dashboard from './Dashboard.jsx';


export const useStyles = makeStyles({
    list: {
        width: 300,
    },
    fullList: {
        width: 'auto',
    },
    paperAnchorLeft: {
        backgroundImage: 'linear-gradient(#358FE2, #2C0A8C)',
    },
    card: {
        minWidth: 275,
        textAlign: 'center',
        padding: 50,
        paddingBottom: 138,
        backgroundImage: 'linear-gradient(#358FE2, #2C0A8C)'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    }
});

export default function MainApp(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({ left: false });
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        console.log('props=', props.location.state);
        if (props.location.state !== undefined && props.location.state.userObj.isLoggedIn) {
            setFlag(true);
        }
    }, [props.location.state])

    function _moveToTablesScreen() {
        props.history.push({
            pathname: '/table',
        });
    }

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [side]: open });
    };

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
        </div>);



    if (flag) {
        var userObj = props.location.state.userObj;
        //console.log('name=', userObj);
        return (
            <div>
                <TopNavbar user={userObj} handleDrowerOpen={toggleDrawer('left', true)} />
                <Dashboard />
                <div>
                    <Drawer
                        classes={{ paperAnchorLeft: classes.paperAnchorLeft }}
                        variant="temporary"
                        anchor="left"
                        open={state.left}
                        onClose={toggleDrawer('left', false)}
                    >
                        {sideList('left')}
                    </Drawer>
                </div>
                <BottomNavbar />
            </div>
        );

    }

    else {
        return (
            <div>
                <TopNavbar user={userObj} />
                <PicNavbar />

                <Box className={classes.card}>
                    <Typography variant="h3" className={classes.title}>
                        Helpy
            </Typography>
                    <Typography variant="h6" className={classes.title}>
                        Manage Your App
                        </Typography>

                    <img className="" src={require('../../Images/logo.png')} alt="none" />

                </Box>
                <BottomNavbar />
            </div>
        );
    }
}
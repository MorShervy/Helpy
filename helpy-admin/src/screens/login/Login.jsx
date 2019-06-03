import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import PicNavbar from '../../components/navbars/PicNavbar.jsx';
import TopNavbar from '../../components/navbars/TopNavbar.jsx';
import BottomNavbar from '../../components/navbars/BottomNavbar.jsx';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    card: {
        display: 'flex',
        minWidth: 275,
        height: 462,
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
        paddingRight: 450,
        paddingLeft: 450,
        paddingTop: 30,
        paddingBottom: 30,
        backgroundImage: 'linear-gradient(#358FE2, #2C0A8C)',
    },
    cardin: {
        margin: 0,
        paddingRight: 50,
        paddingLeft: 50,
        paddingTop: 40,
        paddingBottom: 115,
    },
    cardalert: {
        paddingTop: 20,
        borderWidth: 2,
    },
    cardMessage: {
        backgroundColor: 'red',
        color: 'white',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
        backgroundImage: 'linear-gradient(#358FE2, #2C0A8C)',
        color: 'white',
    },
})
);

export default function Login(props) {
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");



    useEffect(() => {
        // console.log('pass',pass);
        // console.log('name',name);
        // console.log('name',show);
    });

    function _handleLogin() {
        //alert('alert')
        const data = {
            username: `${name}`,      //must be compatible with the WEB SERVICE parameters!!!
            password: `${pass}` //must be compatible with the WEB SERVICE parameters!!!
        };


        fetch('http://localhost:64379/WSHelpyM.asmx/AdminLogin', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json;',
            }),
            body: JSON.stringify(data)
        })
            .then(res => {
                console.log('res=', res);
                return res.json()
            })
            .then(
                (result) => {
                    //console.log("fetch POST= ", result);
                    //console.log("fetch POST.d= ", result.d);
                    var u = JSON.parse(result.d);
                    if (u != null) {
                        //console.log(u.AdminID);
                        //console.log(u.AdminUserName);
                        //console.log(u.AdminPassword);
                        setShow(false);
                        var userObj = {
                            userId: u.AdminID,
                            userName: u.AdminUserName,
                            isLoggedIn: true,
                        };
                        props.history.push({
                            pathname: '/',
                            state: { userObj: userObj }
                        });
                    }
                    else {
                        //console.log('aheret')
                        setShow(true)
                    }
                },
                (error) => {
                    console.log("err post=", error);
                });
    }

    //console.log('render', show)
    return (
        <div>
            <TopNavbar />
            <PicNavbar />
            <Card className={classes.card}>
                <Card className={classes.cardin} >
                    <div className={classes.container} noValidate autoComplete="off">
                        <Typography gutterBottom variant="h5" component="h2">
                            Login
                    </Typography>
                        <TextField
                            id="outlined-email-input"
                            label="Email"
                            className={classes.textField}
                            type="email"
                            name="email"
                            autoComplete="email"
                            margin="normal"
                            variant="outlined"
                            onChange={(e) => { setName(e.target.value) }}
                        />
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            className={classes.textField}
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                            onChange={(e) => { setPass(e.target.value) }}
                        />
                        <Button variant="contained" className={classes.button} onClick={_handleLogin}>
                            LOGIN
                        </Button>
                        {
                            !show ? null :
                                <Card className={classes.cardMessage}>
                                    Invalid Password
                                </Card>
                        }
                    </div>
                </Card>
            </Card>
            <BottomNavbar />
        </div>

    );
}
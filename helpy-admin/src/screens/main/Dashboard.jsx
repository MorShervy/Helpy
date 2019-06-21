import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';


export default function Dashboard(props) {



    return (
        <div>
            <Typography component="div" style={{ backgroundColor: '#f6f8fa', height: '100vh' }} >

                <Box display="flex" justifyContent="flex-start" flexDirection="row" m={0} p={2}>
                    <Box display="flex" flexGrow={0} p={4}>
                        <Box>
                            <Headers txt='Dashbaord' />
                            <TypographyMenu />
                        </Box>
                    </Box>

                    <Box display="flex" flexDirection="column" flexGrow={1} p={2}>
                        <Box p={2}>
                            <Headers txt='App Overview' />
                        </Box>
                        <Box p={2}>
                            <Headers txt='Latest Users' />
                        </Box>
                    </Box>
                </Box>
            </Typography>
        </div>
    )
}


export function Headers(props) {
    return (
        <div style={{ backgroundImage: 'linear-gradient(#358FE2, #2C0A8C)' }}>
            <div style={{ flexGrow: 1, }}>
                <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
                    <Typography variant="h6" style={{ flexGrow: 1, paddingLeft: 10 }}>
                        {props.txt}
                    </Typography>
                </AppBar>
            </div>
        </div>
    )
}

const useStyles = makeStyles({
    root: {
        width: 230,
    },
});

export function TypographyMenu() {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <MenuList>
                <MenuItem>
                    <ListItemIcon>
                        <SendIcon />
                    </ListItemIcon>
                    <Typography variant="inherit">A short message</Typography>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <PriorityHighIcon />
                    </ListItemIcon>
                    <Typography variant="inherit">A very long text that overflows</Typography>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <DraftsIcon />
                    </ListItemIcon>
                    <Typography variant="inherit" noWrap>
                        A very long text that overflows
            </Typography>
                </MenuItem>
            </MenuList>
        </Paper>
    );
}
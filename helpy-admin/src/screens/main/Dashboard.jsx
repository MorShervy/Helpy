import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


export default function Dashboard(props) {



    return (
        <div>
            <Typography component="div" style={{ backgroundColor: '#f6f8fa', height: '100vh' }} >

                <Box display="flex" justifyContent="flex-start" flexDirection="row" m={0} p={2}>
                    <Box display="flex" p={4}>
                        <Box>
                            <Headers txt='Dashbaord' />
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
                    <Typography variant="h6" style={{ flexGrow: 1, }}>
                        {props.txt}
                    </Typography>
                </AppBar>
            </div>
        </div>
    )
}
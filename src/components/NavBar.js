import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'


const NavBar = () => {
    return(
        <div>
            <AppBar position="static" style={{ background: '#4CAF50' }}>
                <Toolbar>
                    <Typography variant="h5" color="inherit">
                        La place du marché
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
};
export default NavBar;
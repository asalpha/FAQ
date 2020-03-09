import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import logo from './logo.svg';
import './App.css';


function Appbar() {
  return (
    <div className="App">
    <AppBar position="static" color='secondary' position='sticky'>
        <Toolbar>
          <IconButton edge="start" style={{marginRight:6}} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{flexGrow: 1}}>
            Find the solution to all your problems
          </Typography>
          <Button style={{margin:15}} variant="contained" color="primary">Login</Button>
          <Button style={{margin:15}} variant="contained" color="primary">Search</Button>
          <Button style={{margin:15}} variant="contained" color="primary">FAQ</Button>
          <Button style={{margin:15}} variant="contained" color="primary">Tickets</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Appbar;

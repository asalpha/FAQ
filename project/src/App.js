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
import FAQ from "./FAQ";
import Appbar from './AppBar'
import { useHistory } from "react-router-dom";

function App() {
  let history = useHistory();
  let token = history.location.state ? history.location.state.token : "";
  let user = history.location.state ? history.location.state.user : "";

  console.log("APP TOKEN USER", token, user)
  return (
    <div>
      <Appbar token={token} user={user} />
      <div style={{textAlign: 'center', alignItems:'center', backgroundColor:'white', height:'100vh'}}>
        <h1 style={{padding: 38, margin:0, color: 'black', textAlign: 'center'}}>
        WELCOME TO
        </h1>
        <img src={'https://www.pngitem.com/pimgs/m/404-4040941_faq-png-clipart-frequently-asked-questions-transparent-png.png'}  alt="logo" />
      </div>

    </div>
  );
}

export default App;

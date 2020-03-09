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

function App() {
  return (
    <div>
      <Appbar/>
      <div style={{textAlign: 'center', alignItems:'center', backgroundColor:'black', height:'100vh'}}>
        <h1 style={{padding: 88, paddingTop:151, margin:0, color: 'white', textAlign: 'center'}}>
        WELCOME TO
        </h1>
        <img src={'https://lh3.googleusercontent.com/proxy/5wxd9fYWKbmt0-7TALTwf1GH0nCR4BB8qj6XuqKv6knKlyg_7UpRb2FdClnDjsN84ia0tn5fxL5mFkBgV-b1QqMXJmWAT2Fe7Q'}  alt="logo" />
      </div>

    </div>
  );
}

export default App;

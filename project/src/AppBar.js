import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import logo from './logo.svg';
import './App.css';
import { useHistory } from "react-router-dom";

function Appbar() {
  let history = useHistory();
  console.log("APP BAR HISTORY", history.location.state)
  let token = history.location.state ? history.location.state.token : "";
  let user = history.location.state ? history.location.state.user : "";
  console.log("USER", user)

  let handlePress = path => {
    console.log(path)
    console.log("TOKEN", token)

    if (!token) {
      console.log('inside sign in')
      path = "/signin"
      history.push(path, { token: token, user: user})
    } else if (path === "/faq") {
      apiFetch()
    } else if (path === "/answerticket") {
      ticketFetch()
    } else {
      console.log('inside else')
      history.push(path, { token: token, user: user})
    }
  }

  let apiFetch = async () => {
    try {
    await fetch(`https://4a6fa1ae.ngrok.io/question?token=${token}`)
      .then(res => res.json())
      .then((result) => {
        result = result.questions
        console.log(result)
        var rows = []
        for (let i = 0; i < result.length; i++) {
          console.log("i", result[i])
          rows.push({
            title: result[i].question,
            content: result[i].answer,
            views: result[i].views.count,
          })
        }
        console.log("ROWS", rows)
        let data = {
          title: "Frequently Asked Questions",
          rows: rows
        }
        console.log("DATA", data)
        history.push("/faq", { token: token, data:data, user: user})
        return result
      })
    } catch(error) {
      alert(error)
    }
  }

  let ticketFetch = async () => {
    try {
    await fetch(`https://4a6fa1ae.ngrok.io/question?token=${token}`)
      .then(res => res.json())
      .then((result) => {
        result = result.questions
        result = result.filter(function(obj) {return obj.answer === ""})
        console.log(result)
        let data = []
        console.log("DATA", data)
        history.push("/answerticket", { token: token, data:result, user: user})
        return result
      })
    } catch(error) {
      alert(error)
    }
  }


  return (
    <div className="App">
    <AppBar position="static" color='white' position='sticky'>
        <Toolbar>
        <Button onClick={() =>  handlePress("/")}>
          <img style={{height:45, width:75}} src='https://www.jobboom.com/career/wp-content/uploads/2013/08/FAQ1.jpg' alt="Logo" />
        </Button>
          <Button onClick={() =>  handlePress("/")} style={{color:'black', fontWeight:'bold', fontSize:33, flexGrow: 1}}>

          </Button>
          <Button onClick={() => handlePress("/faq")} style={{margin:15}} variant="contained" color="primary">FAQs</Button>
          <Button onClick={() => handlePress("/answerticket")} style={{margin:15}} variant="contained" color="primary">Answer</Button>
          <Button onClick={() => handlePress("/analytics")} style={{margin:15}} variant="contained" color="primary">Analytics</Button>
          <Button onClick={() => handlePress("/search")} style={{margin:15, width:111}} variant="contained" color="primary">Search</Button>
          <Typography style={{fontSize:44, marginRight:13}}> | </Typography>
          {user ? <div>
            <AccountCircleIcon size="large" style={{color:'#e91e63', marginRight:4}} />
            <Typography style={{fontSize:15, color:'#e91e63'}}> {user.substring(0,user.search('@'))} </Typography>
          </div>
           : <Button onClick={() => handlePress("/signin")} style={{margin:15}} variant="contained" color="secondary">Login</Button>}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Appbar;

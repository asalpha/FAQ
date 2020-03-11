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
    await fetch(`http://4e90c95c.ngrok.io/faq?token=${token}`)
      .then(res => res.json())
      .then((result) => {

        console.log(result)
        var rows = []
        for (let i = 0; i < result.faqs.length; i++) {
          console.log("i", result.faqs[i])
          rows.push({
            title: result.faqs[i].questionDesc,
            content: result.faqs[i].solutionDesc
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
    await fetch(`http://4e90c95c.ngrok.io/ticket?token=${token}`)
      .then(res => res.json())
      .then((result) => {
        result = result.tickets
        result = result.filter(function(obj) {return obj.solutionDesc === ""})
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
    <AppBar position="static" color='primary' position='sticky'>
        <Toolbar>
          <IconButton edge="start" style={{marginRight:6}} color="inherit" size="small" aria-label="menu">
            <AccountCircleIcon style={{marginRight:4}} />
            {user}
          </IconButton>
          <Button onClick={() =>  handlePress("/")} style={{color:'white', fontWeight:'bold', fontSize:33, flexGrow: 1}}>
            FAQ.AI
          </Button>
          {user ? null : <Button onClick={() => handlePress("/signin")} style={{margin:15}} variant="contained" color="secondary">Login</Button>}
          <Button onClick={() => handlePress("/search")} style={{margin:15}} variant="contained" color="secondary">Search</Button>
          <Button onClick={() => handlePress("/faq")} style={{margin:15}} variant="contained" color="secondary">FAQ</Button>
          <Button onClick={() => handlePress("/answerticket")} style={{margin:15}} variant="contained" color="secondary">Answer Tickets</Button>
          <Button onClick={() => handlePress("/submitFaq")} style={{margin:15}} variant="contained" color="secondary">Submit FAQ</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Appbar;

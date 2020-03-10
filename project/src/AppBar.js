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
import { useHistory } from "react-router-dom";

function Appbar() {
  let history = useHistory();
  console.log("APP BAR HISTORY", history.location.state)
  let token = history.location.state ? history.location.state.token : "";

  let handlePress = path => {
    console.log(path)
    console.log("TOKEN", token)

    if (!token) {
      console.log('inside sign in')
      path = "/signin"
      history.push(path, { token: token})
    } else if (path === "/faq") {
      apiFetch()
    } else if (path === "/answerticket") {
      ticketFetch()
    } else {
      console.log('inside else')
      history.push(path, { token: token})
  }

}

  let apiFetch = async () => {
    try {
    await fetch(`http://74b6b87c.ngrok.io/faq?token=${token}`)
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
        history.push("/faq", { token: token, data:data})
        return result
      })
    } catch(error) {
      alert(error)
    }
  }

  let ticketFetch = async () => {
    try {
    await fetch(`http://74b6b87c.ngrok.io/ticket?token=${token}`)
      .then(res => res.json())
      .then((result) => {
        result = result.tickets
        result = result.filter(function(obj) {return obj.solutionDesc === ""})
        console.log(result)
        let data = []
        console.log("DATA", data)
        history.push("/answerticket", { token: token, data:result})
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
          <IconButton edge="start" style={{marginRight:6}} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{flexGrow: 1}}>
            Find the solution to all your problems
          </Typography>
          <Button onClick={() => handlePress("/signin")} style={{margin:15}} variant="contained" color="secondary">Login</Button>
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

import React from 'react';
import Popup from "reactjs-popup"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LiveHelp from '@material-ui/icons/LiveHelp';
import Typography from '@material-ui/core/Typography';
import Appbar from './AppBar'
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";


const useStyles = makeStyles(theme => ({
  root: {
    // alignItems: 'center'
    // alignSelf:'center'
    height: '100vh'
  },
  image: {
    backgroundImage: 'url(https://previews.123rf.com/images/abluecup/abluecup1209/abluecup120900453/15405016-a-person-is-using-the-magnifying-glass.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    marginTop: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor:'#361fa7',
    width:'100%'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'blue',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function Search() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);
  const [desc, setDesc] = React.useState("");
  const [check, setCheck] = React.useState(false);

  let history = useHistory();
  console.log("APP BAR HISTORY", history.location.state)
  let token = history.location.state ? history.location.state.token : "";
  let user = history.location.state ? history.location.state.user : "";
  console.log("SEARCH", token, user)


  let getQuestions = async () => {
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
        // history.push("/faq", { token: token, data:data, user: user})
        return result
      })
    } catch(error) {
      alert(error)
    }
  }


  let apiFetch = async (data) => {
    try {
      console.log("FETCH STARTED")
    await fetch('https://4a6fa1ae.ngrok.io/question', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
        question: desc,
        sensitivity: 1,
        submit: check,
      })
    })
      .then(res => res.json())
      .then((response) => {

        console.log("RESPONSE:", response)
        console.log("MATCH:", response.match)
        let result = response.results
        result = result.filter(function(obj) {return obj.answer !== ""})
        let expand = {}
        for(let i = 0; i < result.length; i++) {
          expand[result.id] = false
        }
        // result.push(response.topResult)
        history.push("/ticket", { token: token, data:result, expand: expand, user:user})
        return result
      })
    } catch(error) {
      alert(error)
    }
  }


  let handleChange = event => {
    console.log(event.target.value)
    setDesc(event.target.value)
  }


  let handleCheck = event => {
    console.log(event.target.checked)
    setCheck(event.target.checked)
  }

  let handlePress = () => {
    apiFetch()
    // getQuestions()
    console.log("PREESSEEDD")
  }

  return (
    <div>
    <Appbar token={token} user={user} />


        <div className={classes.paper}>
          <Typography component="h1" variant="h5" style={{color:"white", fontSize:33, padding:22, paddingTop:33}}>
            Search or Create a ticket
          </Typography>

          <TextField
          // label="With normal TextField"
          onChange={handleChange}
          style={{backgroundColor:"white",width:'75%',}}
          InputProps={{style:{marginLeft:20, height:50}, endAdornment: (<SearchIcon style={{ padding:8}}/>)}}
          />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" style={{color:"white"}} />}
              label="Submit New Ticket"
              style={{color:"white"}}
              onChange={handleCheck}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{width:200,height:50, margin:22}}
              onClick={handlePress}
            >
              Search
            </Button>

        </div>
      </div>

  );
}

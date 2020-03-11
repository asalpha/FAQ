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
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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


export default function SignInSide() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);
  const [desc, setDesc] = React.useState("");
  const [check, setCheck] = React.useState(false);

  let history = useHistory();
  console.log("APP BAR HISTORY", history.location.state)
  let token = history.location.state ? history.location.state.token : "";
  let user = history.location.state ? history.location.state.user : "";
  console.log("SEARCH", token, user)

  let apiFetch = async (data) => {
    try {
    await fetch('http://4e90c95c.ngrok.io/ticket', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
        problemDesc: desc,
        sensitivity: 1,
        submit: check,
      })
    })
      .then(res => res.json())
      .then((response) => {

        console.log(response)
        console.log(response.match)
        let result = response.results
        // result.push(response.topResult)
        console.log(result)
        var rows = []
        for (let i = 0; i < result.length; i++) {
          console.log("i", result[i])
          rows.push({
            title: result[i].problemDesc,
            content: result[i].solutionDesc
          })
        }
        console.log("ROWS", rows)
        let data = {
          title: response.match ? "MATCHING TICKET" : "SIMILAR TICKETS",
          rows: rows
        }
        console.log("DATA", data)
        history.push("/ticket", { token: token, data:data, user:user})
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
    console.log("PREESSEEDD")
  }

  return (
    <div>
    <Appbar token={token} user={user} />
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LiveHelp />
          </Avatar>
          <Typography component="h1" variant="h5">
            Search or Create a ticket
          </Typography>
            <TextField
              variant="filled"
              multiline
              margin="normal"
              required
              fullWidth
              rows="6"
              id="filled-multiline-static"
              label="Enter the Problem Description here"
              name="search"
              autoComplete="search"
              autoFocus
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Submit New Ticket"
              onChange={handleCheck}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handlePress}
            >
              Search
            </Button>

        </div>
      </Grid>
      </Grid>
      </div>

  );
}

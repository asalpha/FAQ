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
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";


const useStyles = makeStyles(theme => ({
  root: {
    // alignItems: 'center'
    // alignSelf:'center'
    height: '100vh'
  },
  image: {
    backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/d/dd/Logo_for_Think._Check._Submit.png)',
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
  const [ques, setQues] = React.useState("");
  const [sol, setSol] = React.useState("");

  let history = useHistory();
  console.log("APP BAR HISTORY", history.location.state)
  let token = history.location.state ? history.location.state.token : "";


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
          title: "SIMILAR TICKETS",
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


  let submit = async (ques , sol) => {
    try {
    await fetch('http://74b6b87c.ngrok.io/faq', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    token: token,
    questionDesc: ques,
    solutionDesc: sol,
    sensitivity: 0,
  })
})
.then(res => res.json())
.then((result) => {
  console.log(result)
  apiFetch()
  return result
  })
} catch(error) {
  alert(error)
}
}

let handleQues = event => {
  setQues(event.target.value)
};
let handleSol = event => {
  setSol(event.target.value)
};

let handlePress = event => {
  console.log(ques)
  console.log(sol)
  submit(ques, sol)
}

  return (

    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LiveHelp />
          </Avatar>
          <Typography component="h1" variant="h5">
            Submit FAQ Page
          </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="ques"
              label="Question Description"
              name="ques"
              autoComplete="ques"
              autoFocus
              onChange={handleQues}
            />
            <TextField
              variant="filled"
              multiline
              margin="normal"
              required
              fullWidth
              rows="6"
              id="filled-multiline-static"
              label="Enter the Answer Description here"
              name="ans"
              autoComplete="ans"
              autoFocus
              onChange={handleSol}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handlePress}
            >
              Submit FAQ
            </Button>

        </div>
      </Grid>
      </Grid>

  );
}

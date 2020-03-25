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

import { CardMedia } from '@material-ui/core';
import { Grid } from '@material-ui/core';



const useStyles = makeStyles(theme => ({
    preTitle: {
      marginTop: 45,
      fontFamily: 'Arial',
      fontSize: 15, /** unsure if this should be in pixels */
      color: 'grey'
    },
    mainTitle: {
      marginBottom: 35,
      fontWeight: 'bold',
      fontFamily: 'Trebuchet MS',
      fontSize: 50,
      color: "#e91e63"
    },
    body: {
      fontSize: '100%',
      marginBottom: 45,
      marginRight: 45
    },
    footer: {
      backgroundColor: 'white',
      borderColor: 'green',
      padding: theme.spacing(6),
    },
    media:{
      height: 0,
      paddingTop: '56.25%', // 16:9 - keep this or image disappears
      marginTop: 130,
      marginLeft: 80, // to-do: need to make it doesn't re-size
      marginBottom: 80 // to-do: need to align the image more right
    }
}));


function App() {
  let history = useHistory();
  let token = history.location.state ? history.location.state.token : "";
  let user = history.location.state ? history.location.state.user : "";
  const classes = useStyles();

  console.log("APP TOKEN USER", token, user)
  return (
    <div>
      <Appbar token={token} user={user} />
      <Grid container spacing={3} style={{paddingTop:35}}>
          <Grid item xs={5}>
            <CardMedia
              className={classes.media}
              image={require('./insideHome.png')}
              title="Person Inside Home"
              />
          </Grid>
          <Grid item xs={7}>
          <div className={classes.footer}>

            <Typography className={classes.preTitle} style={{paddingTop:38}} align="left" gutterBottom>
              OUR VISION
            </Typography>
            <div>
              <Typography className={classes.mainTitle} align="left" gutterBottom>
                The future <br/>
                we're building
              </Typography>
            </div>
            <div>
            <Typography className={classes.body} align="left" gutterBottom>
                We are building a company and a product that will allow the employees to quickly resolve their issues without having to burden the people at the IT department, saving a lot of time, money and resources that can be put to better use</Typography>
            </div>
          </div>
          </Grid>
        </Grid>

    </div>
  );
}

export default App;

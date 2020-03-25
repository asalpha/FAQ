import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Faq from 'react-faq-component';
import Appbar from './AppBar'
import { useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Search from './search'
import { Collapse,  CardBody, Card } from 'reactstrap';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';


const dataOld = {
  title: "TICKETS",
  rows: [
    {
      title: "Lorem ipsum dolor sit amet,",
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat,
              ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus.
              In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae.
              Fusce sed commodo purus, at tempus turpis.`
    },
    {
      title: "Nunc maximus, magna at ultricies elementum",
      content: "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam, vitae convallis ex tortor sed dolor."
    },
    {
      title: "Curabitur laoreet, mauris vel blandit fringilla",
      content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
            Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
            Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
            Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `
    },
    {
      title: "What is the package version",
      content: "v1.0.0"
    }]
}


const styles = {
  bgColor: 'white',
  titleTextColor: 'green',
  rowTitleColor: 'blue',
  rowContentColor: 'black'
}


export default function Tickets() {
  let history = useHistory();
  let token = history.location.state ? history.location.state.token : "";
  let user = history.location.state ? history.location.state.user : "";
  let data = history.location.state ? history.location.state.data : dataOld;
  let expand = history.location.state ? history.location.state.expand : {};
  const [isOpen, setIsOpen] = React.useState(false);
  console.log("TICEKTS", data)
  let cards = []

  let updateView = (id) => {
    try {
      console.log("FETCH STARTED")
    fetch('https://4a6fa1ae.ngrok.io/view', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
        id: id,
      })
    })
      .then(res => res.json())
      .then((response) => {

        console.log("RESPONSE:", response)
      })
    } catch(error) {
      alert(error)
    }
  }

  const toggle = (id) => {
    setIsOpen(!isOpen)
    console.log("before", expand)
    if(!expand[id]) {
      updateView(id)
    }
    expand[id] = !expand[id]
    console.log("after", expand)
  };

  const checkOpen = (id) => {
    console.log("chcek open")
    return expand[id]
  }

  const handleVote = (id, like) => {
    console.log("D1: ", data)
    for(let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        console.log("FOUND", like)
        if(like === "true") {
          if(!data[i].likedBy.includes(user)) {
             data[i].likedBy.push(user)
          }
          data[i].dislikedBy = data[i].dislikedBy.filter(e => e !== user)
        } else {
          if(!data[i].dislikedBy.includes(user)) {
             data[i].dislikedBy.push(user)
          }
          data[i].likedBy = data[i].likedBy.filter(e => e !== user)
        }
        break
      }
    }
    console.log("D2: ", data)
    try {
        console.log("vote starte")
      fetch('https://4a6fa1ae.ngrok.io/rate', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          id: id,
          like: like,
        })
      })
        .then(res => res.json())
        .then((response) => {
          console.log("VOTE RESPONSE:", response)
          history.push("/ticket", { token: token, data:data, expand: expand, user:user})
        })
      } catch(error) {
        alert(error)
      }

  }

  for(let i = 0; i < data.length; i++) {
    let row = data[i]
    cards.push(
      <div style={{border: '1px solid black',}}>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>

        <Button color="primary" onClick={() => toggle(row.id)} style={{ textTransform: "none" }}>
          <Typography style={{paddingLeft:2, fontSize:16,textTransform: "none"}}> {row.question} </Typography>
        </Button>

        <div style={{display:'flex', flexDirection:'row', padding:13}}>
        <Typography style={{padding:5}}> {row.likedBy ? row.likedBy.length : 0} </Typography>
        <ThumbUpIcon onClick={() => handleVote(row.id, 'true')} style={{padding:5, color:'green'}}/>
        <ThumbDownIcon onClick={() => handleVote(row.id, 'false')} style={{padding:5, color:'red'}}/>
        <Typography style={{padding:5}}> {row.likedBy ? row.dislikedBy.length : 0} </Typography>
        </div>
        </div>
        {checkOpen(row.id) ? <Typography style={{padding:10,fontSize:16}}> {row.answer} </Typography> : null}
      </div>

    )
  }
    return (
      <div >
        <Search/>
        <div style={{padding:50, paddingLeft:150, paddingRight:150}}>
        {cards}
        </div>
      </div>
    )
}

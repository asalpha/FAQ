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

  const toggle = (id) => {
    setIsOpen(!isOpen)
    console.log("before", expand)
    expand[id] = !expand[id]
    console.log("after", expand)
  };

  const checkOpen = (id) => {
    console.log("chcek open")
    return expand[id]
  }

  const handleVote = (id, like) => {
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
        <Button color="primary" onClick={() => toggle(row.id)} style={{ marginBottom: '1rem' }}>{row.question}</Button>
        <div style={{display:'flex', flexDirection:'row', padding:13}}>
        <ThumbUpIcon onClick={() => handleVote(row.id, 'true')} style={{padding:5, color:'green'}}/>
        <ThumbDownIcon onClick={() => handleVote(row.id, 'false')} style={{padding:5, color:'red'}}/>
        </div>
        </div>
        {checkOpen(row.id) ? <Typography style={{padding:20, borderWidth:5}}> {row.answer} </Typography> : null}
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

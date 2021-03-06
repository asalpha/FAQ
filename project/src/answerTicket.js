import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Faq from 'react-faq-component';
import TextField from '@material-ui/core/TextField';
import Appbar from './AppBar'
import { useHistory } from "react-router-dom";

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



export default function AnswerTicket() {
  let history = useHistory();
  let token = history.location.state ? history.location.state.token : "";
  let user = history.location.state ? history.location.state.user : "";
  let data = history.location.state ? history.location.state.data : dataOld;
  let update = {}

  let apiFetch = async (id, sol) => {
    console.log("fetch started, trying for", id ,"with solution: ", sol)
    try {
    await fetch('https://4a6fa1ae.ngrok.io/question', {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
        id: id,
        answer: sol,
      })
    })
      .then(res => res.json())
      .then((response) => {
        console.log("RESPONSE")
        console.log(response)
        let result = []
        result.push(response.question)
        console.log(result)

        let expand = {}
        for(let i = 0; i < result.length; i++) {
          expand[result.id] = false
        }
        console.log("RESULT: ", result)
        history.push("/ticket", { token: token, data:result, expand: expand, user: user})
        return result
      })
    } catch(error) {
      alert(error)
    }
  }


  let handleChange = event => {
    update[event.target.id] = event.target.value
    console.log(update)

    // setDesc(event.target.value)
  }

  let handleSubmit = (id) => {
    console.log("INSIDE SUBMIT", id, update[id])
    apiFetch(id, update[id])
  }

  console.log("Annswer Tickets", data)

  let e = []
  for (let i = 0; i < data.length; i++) {
    let id = data[i].id
    update[id] = ""
    e.push(
      <Card style={{padding:44}}>
      <Typography component="h2" variant="h5">
        {data[i].question}
      </Typography>
        <TextField
          variant="filled"
          multiline
          margin="normal"
          required
          fullWidth
          rows="6"
          id={id}
          label="Enter the Solution Description here"
          autoFocus
          onChange={handleChange}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          id={id}
          // className={classes.submit}
          onClick={event => handleSubmit(event.currentTarget.id)}
        >
          Submit
        </Button>
    </Card>
    )
  }
    return (
      <div>
      <Appbar token={token} user={user} />
      <div style={{paddingRight:'10%', paddingLeft:'10%', height:'100vh'}}>
      <Typography style={{padding:11}} component="h1" variant="h5">
        Please answer the following tickets
      </Typography>

    {e}
      </div>
      </div>
      )
}

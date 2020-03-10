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



export default function Tickets() {
  let history = useHistory();
  let token = history.location.state ? history.location.state.token : "";
  let user = history.location.state ? history.location.state.user : "";
  let data = history.location.state ? history.location.state.data : dataOld;
  console.log("TICEKTS", data)
    return (
      <div>
      <Appbar token={token} user={user} />
      <div style={{paddingRight:'10%', paddingLeft:'10%', height:'100vh'}}>
      <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="300"
          image="https://c1.sfdcstatic.com/content/dam/blogs/us/thumbnails/4-ways-to-improve-customer-service-with-a-conversational-approach/shutterstock_207788785.jpg"
          title="Contemplative Reptile"
        />
      </CardActionArea>
    </Card>
        <Faq data={data} styles={styles}/>
      </div>
      </div>
      )
}

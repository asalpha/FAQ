import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import Faq from './FAQ';
import SignIn from './SignInSide';
import Submitfaq from './submitFaq'
import Tickets from './tickets'
import Search from './search'
import * as serviceWorker from './serviceWorker';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/faq" component={Faq} />
      <Route path="/signin" component={SignIn} />
      <Route path="/submitfaq" component={Submitfaq} />
      <Route path="/tickets" component={Tickets} />
      <Route path="/search" component={Search} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import Faq from './FAQ';
import SignIn from './SignInSide';
import Submitfaq from './submitFaq'
import Tickets from './tickets'
import AnswerTicket from './answerTicket'
import Search from './search'
import Analytics from './analytics'
import * as serviceWorker from './serviceWorker';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/faq" component={Faq} />
      <Route path="/signin" component={SignIn} />
      <Route path="/submitfaq" component={Submitfaq} />
      <Route path="/ticket" component={Tickets} />
      <Route path="/answerticket" component={AnswerTicket} />
      <Route path="/search" component={Search} />
      <Route path="/analytics" component={Analytics} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));
serviceWorker.unregister();

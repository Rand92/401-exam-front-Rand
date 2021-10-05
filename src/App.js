import React, { Component } from 'react'
import { withAuth0 } from '@auth0/auth0-react';
import Home from './components/Home';
import Favorites from './components/Favorites';
import LoginButton from './components/LogiButton';
import LogoutButton from './components/LogoutButton';
import { BrowserRouter as Router ,router ,Switch } from 'react-router-dom';
export class App extends Component {
  render() {
    return (
      <div>
        <Router>
          {
            this.props.auth0.isAuthenticated?
            <Home isAuthenticated ={this.props.auth0.isAuthenticated}/>
          }
    
        {/* @todo show login button and hide the list for unauthenticated users */}
        {/* @todo show logout button and show items list components for authenticated users */}
<Switch>
  <Route>
    exact path="/"
  </Route>
</Switch>
     </Router>
      </div>
    )
  }
}

export default withAuth0(App);

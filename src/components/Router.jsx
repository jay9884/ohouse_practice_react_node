import React from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Gnb from './gnb/Gnb';
import Login from '../routes/Login';
import SignUp from '../routes/signup/SignUp';

class PageRouter extends React.Component {
  state = {
    username: null
  }

  getUserName = async () => {
    const {
      data:{ username }
    } = await axios.get('http://localhost:3001/api');
    this.setState({ username: username })
  }

  componentDidMount() {
    this.getUserName()
  }

  render() {
    let { username } = this.state;
    return (
      <>
        <Router>
          <Gnb />
          <Switch>
            <Route path="/login" exact={true} component={Login} />
            <Route path="/signup" exact={true} component={SignUp} />
          </Switch>
        </Router>
        <h1>{username ? `hello ${username}`: 'helloworld'}</h1>
      </>
    )
  }
}

export default PageRouter;
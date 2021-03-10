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
import Productions from '../routes/productions';
import Home from '../routes/Home';
import CategoryNav from './CategoryNav';

class PageRouter extends React.Component {
  // state = {
  //   username: null
  // }

  // getUserName = async () => {
  //   const {
  //     data:{ username }
  //   } = await axios.get('http://localhost:3003/api');
  //   this.setState({ username: username })
  // }

  // componentDidMount() {
  //   this.getUserName()
  // }

  render() {
    return (
      <>
        <Router>
          <Gnb />
          <CategoryNav />
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/login" exact={true} component={Login} />
            <Route path="/signup" exact={true} component={SignUp} />
            <Route path="/productions" component={Productions} />
          </Switch>
        </Router>
      </>
    )
  }
}

export default PageRouter;
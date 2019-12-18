import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const Signin = React.lazy(() => import('./Components/Signin/Signin'));
const Home = React.lazy(() => import('./Components/Home/Home'));

class App extends Component {

  render() {
    return (

      <Switch>
        <Route exath path='/signin' component={Signin} />
        <Route exact path='/' component={Home} />
      </Switch>
    )
  }
}

const mapStateToProps = state => {
  return {
    authUser: state.authUser
  };
};

export default withRouter(connect(mapStateToProps, null)( App ));

import React, { Component } from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import _ from 'lodash';

export class App extends Component {
  render() {
    {this.ensureSession()}
    return (
      <Header />
    );
  }

  ensureSession() {
    if(_.isEmpty(this.props.session)) {
        browserHistory.push('/signup');
    }
  }
}

export const mapStateToProps = (state) => {
    return {
        session: state.session
    }
}

export default connect(mapStateToProps)(App);

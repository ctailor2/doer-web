import React, { Component } from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {pingApiAction} from '../actions/apiActions';

export class App extends Component {
  constructor(props) {
    super(props);
    this.props.pingApiAction();
  }

  render() {
    return (
      <Header />
    );
  }
}

export default connect(null, {pingApiAction})(App);

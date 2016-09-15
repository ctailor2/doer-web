import React, { Component } from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import _ from 'lodash';

export default class App extends Component {
  render() {
    return (
      <Header />
    );
  }
}
import React, { Component } from 'react';
import requireAuth from './requireAuth';

export class Feature extends Component {
  render() {
    return <div>This is the feature!</div>;
  }
}

export default requireAuth(Feature);

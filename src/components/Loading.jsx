import Loader from 'react-loader-spinner';
import React, { Component } from 'react';

class Loading extends Component {
  //other logic
  render() {
    return (
      <Loader
        type="ThreeDots"
        color="rgba(255, 0, 0, 0.25)"
        height="100"
        width="100"
      />
    );
  }
}

export default Loading;

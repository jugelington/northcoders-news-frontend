import React, { Component } from 'react';

class Error extends Component {
  render() {
    return (
      <div>
        <p>
          Error - {this.props.location.state.status} <br />
          {this.props.location.state.msg}{' '}
        </p>
      </div>
    );
  }
}

export default Error;

import React, { Component } from 'react';
import tick from '../images/tick.png';
import cross from '../images/cross.png';

import '../css/Vote.css';
import * as api from '../api';

class Vote extends Component {
  state = {
    voteChange: 0
  };
  render() {
    return (
      <section className="votebox">
        <button
          onClick={() => this.vote('up')}
          disabled={this.state.voteChange === 1}
        >
          <img src={tick} alt="upvote" />
        </button>
        <h2>{this.props.votes + this.state.voteChange}</h2>
        <button
          onClick={() => this.vote('down')}
          disabled={this.state.voteChange === -1}
        >
          <img src={cross} alt="downvote" value={'down'} onClick={this.vote} />
        </button>
      </section>
    );
  }

  vote = direction => {
    api.patchArticleVotes(this.props.section, this.props._id, direction);
    this.setState({
      voteChange:
        direction === 'up'
          ? this.state.voteChange + 1
          : this.state.voteChange - 1
    });
  };
}

export default Vote;

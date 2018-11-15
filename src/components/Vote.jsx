import React, { Component } from 'react';
import thumbsup from '../images/thumbsup.png';
import thumbsdown from '../images/thumbsdown.png';
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
          <img src={thumbsup} alt="upvote" />
        </button>
        {this.props.votes + this.state.voteChange}
        <button
          onClick={() => this.vote('down')}
          disabled={this.state.voteChange === -1}
        >
          <img
            src={thumbsdown}
            alt="downvote"
            value={'down'}
            onClick={this.vote}
          />
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

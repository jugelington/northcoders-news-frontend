import React from 'react';
import UserDisplay from './UserDisplay';
import DeleteButton from './DeleteButton';
import Vote from './Vote';
import moment from 'moment';
import { Link } from '@reach/router';

const CommentSummary = ({ comment, user, handleDelete, profilePage }) => {
  return (
    <div className="comment">
      <p className="comment-body">{comment.body}</p>
      {moment(comment.created_at).format('MMMM DD YYYY')}
      <div className="comment-votes">
        {!profilePage ? (
          <Vote
            id="comment"
            votes={comment.votes}
            _id={comment._id}
            section={'comments'}
          />
        ) : (
          `${comment.votes} votes`
        )}
      </div>
      {!profilePage && (
        <UserDisplay
          username={comment.created_by.username}
          avatarUrl={comment.created_by.avatar_url}
        />
      )}
      {comment.belongs_to
        ? profilePage && (
            <Link to={`/articles/${comment.belongs_to._id}`}>
              <button>Go To</button>
            </Link>
          )
        : 'Article Deleted'}
      <DeleteButton
        handleDelete={handleDelete}
        user={user}
        item={comment}
        category="comments"
      />
    </div>
  );
};

export default CommentSummary;

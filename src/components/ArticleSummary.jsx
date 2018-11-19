import React from 'react';
import { Link } from '@reach/router';
import Vote from './Vote';
import moment from 'moment';
import UserDisplay from './UserDisplay';
import DeleteButton from './DeleteButton';
import PropTypes from 'prop-types';

const ArticleSummary = ({
  article,
  frontPage,
  profilePage,
  user,
  handleDelete
}) => {
  return (
    <div className="article">
      <h3 className="article-title">{article.title}</h3>
      <p className="article-body">
        {article.body} <br />
        {frontPage && (
          <Link className="links" to={`/articles/${article._id}`}>
            <button>Read More</button>
          </Link>
        )}
      </p>
      {moment(article.created_at).format('MMMM DD YYYY')}
      <br />
      {!frontPage || article.comment_count
        ? `${article.comment_count} comments`
        : `0 Comments`}
      <div className="article-votes">
        {!profilePage ? (
          <Vote votes={article.votes} _id={article._id} section={'articles'} />
        ) : (
          `Votes: ${article.votes}`
        )}
      </div>{' '}
      {!profilePage && (
        <UserDisplay
          username={article.created_by.username}
          avatarUrl={article.created_by.avatar_url}
        />
      )}
      <DeleteButton
        user={user}
        item={article}
        handleDelete={handleDelete}
        category="articles"
      />
    </div>
  );
};

ArticleSummary.propTypes = {
  article: PropTypes.object,
  frontPage: PropTypes.bool,
  profilePage: PropTypes.bool,
  user: PropTypes.object,
  handleDelete: PropTypes.func
};
export default ArticleSummary;

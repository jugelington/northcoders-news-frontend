import axios from 'axios';

const BASE_URL = 'https://sheltered-sands-58798.herokuapp.com/api';

export const fetchAllArticles = async () => {
  const { data } = await axios.get(`${BASE_URL}/articles`);
  return data.articles;
};

export const fetchArticlesByTopic = async topic => {
  const { data } = await axios.get(`${BASE_URL}/topics/${topic}/articles`);
  return data.articles;
};

export const fetchArticleById = async id => {
  const { data } = await axios.get(`${BASE_URL}/articles/${id}`);
  return data;
};

export const fetchArticleComments = async id => {
  const { data } = await axios.get(`${BASE_URL}/articles/${id}/comments`);
  return data.comments;
};

export const patchArticleVotes = async (vote, article) => {
  const { data } = await axios.patch(
    `${BASE_URL}/articles/${article}?vote=${vote}`
  );
  return data;
};

export const login = async username => {
  const { data } = await axios.get(`${BASE_URL}/users/${username}`);
  return data;
};

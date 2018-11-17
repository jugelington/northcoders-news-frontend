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

export const patchArticleVotes = async (section, article, direction) => {
  const { data } = await axios.patch(
    `${BASE_URL}/${section}/${article}?vote=${direction}`
  );
  return data;
};

export const fetchUser = async username => {
  const { data } = await axios.get(`${BASE_URL}/users/${username}`);
  return data;
};

export const fetchUserSubmissions = async (userId, category) => {
  const { data } = await axios.get(`${BASE_URL}/users/${userId}/${category}`);
  return data[category] ? data[category] : data;
};

export const deleteItem = async (collection, id) => {
  await axios.delete(`${BASE_URL}/${collection}/${id}`);
};

export const postComment = async (comment, articleId) => {
  const { data } = await axios.post(
    `${BASE_URL}/articles/${articleId}/comments`,
    comment
  );
  return data;
};

export const postArticle = async (article, topic) => {
  const { data } = await axios.post(
    `${BASE_URL}/topics/${topic}/articles`,
    article
  );
  return data;
};

export const fetchAllUsers = async () => {
  const { data } = await axios.get(`${BASE_URL}/users`);
  return data;
};

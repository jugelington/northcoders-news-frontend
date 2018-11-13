import axios from 'axios';

const BASE_URL = 'https://sheltered-sands-58798.herokuapp.com/api/';

export const fetchAllArticles = async () => {
  const { data } = await axios.get(`${BASE_URL}/articles`);
  return data.articles;
};

export const fetchArticlesByTopic = async topic => {
  const { data } = await axios.get(`${BASE_URL}/topics/${topic}/articles`);
  console.log(data);
  return data;
};

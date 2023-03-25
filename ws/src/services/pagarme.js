const axios = require('axios');

const api = axios.create({
  baseURL: 'https://api.pagar.me/1',
});

const api_key = require('../data/keys.json').api_key;

module.exports = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, {
      api_key,
      ...data,
    });

    return { error: false, data: response.data };
  } catch (err) {
    return {
      error: true,
      message: JSON.stringify(err.response.data.errors[0]),
    };
  }
};

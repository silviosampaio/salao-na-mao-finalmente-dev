export default {
  baseURL:
    process.env.NODE_ENV == 'production'
      ? 'https://ws.salaonamao.com.br:8000'
      : 'http://localhost:8000',
  AWS: {
    bucketURL: 'https://salao-na-mao.s3.amazonaws.com',
  },
  validateEmail: (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },
  allFields: (obj, keys) => {
    for (let key of keys) {
      if (!obj[key] || obj[key] === '' || obj[key].length === 0) {
        return false;
      }
    }
    return true;
  },
};

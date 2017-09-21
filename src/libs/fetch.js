export default {
  get: (url) => {
    const init = {
      method: 'GET'
    };
    return new Promise((resolve, reject) =>
      fetch(url, init)
        .then((res) => resolve(res.json()))
        .catch(e => reject(e))
    );
  },
  post: (url, params) => {
    const init = {
      method: 'POST',
      body: params
    };
    return new Promise((resolve, reject) =>
      fetch(url, init)
        .then((res) => resolve(res.json()))
        .catch(e => reject(e))
    );
  }
};
const fetcher = (path, method, body) =>
  new Promise(resolve => {
    fetch(path, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(res => {
      if (!res.ok) {
        throw new Error('요청 실패');
      }
      resolve(res.json());
    });
  });

const API = {
  get: path => fetcher(path, 'GET'),
  post: (path, body) => fetcher(path, 'POST', body),
  delete: path => fetcher(path, 'DELETE'),
  patch: (path, body) => fetcher(path, 'PATCH', body),
};

export default API;

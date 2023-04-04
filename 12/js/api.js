const Urls = {
  GET: 'https://28.javascript.pages.academy/kekstagram/data',
  POST: 'https://28.javascript.pages.academy/kekstagram'
};


const request = (onSucces, onError, method, body) => {
  fetch(
    Urls[method],
    {
      method: method,
      body: body,
    },
  )
    .then((response) => response.json())
    .then((data) => {
      onSucces(data);
    })
    .catch(() => {
      onError();
    });
};

export {request};

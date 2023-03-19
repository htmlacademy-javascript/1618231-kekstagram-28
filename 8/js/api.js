import { getPictureList } from './pictures.js';

const loadDataFromServer = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      getPictureList(data);
    });
};

export {loadDataFromServer};

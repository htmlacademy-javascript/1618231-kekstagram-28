import {pictures} from './data.js';

const pisturesListElement = document.querySelector('.pictures');

const getPictureList = (images) => {
  const stringOfElements = images.map(({id, url, likes, comments}) => `
  <a href="#" class="picture" data-picture="${id}">
  <img class="picture__img" src="${url}" width="182" height="182" alt="Случайная фотография">
  <p class="picture__info">
    <span class="picture__comments">${comments.length}</span>
    <span class="picture__likes">${likes}</span>
  </p>
  </a>
  `).join('');
  pisturesListElement.insertAdjacentHTML('afterbegin', stringOfElements);
};

getPictureList(pictures);

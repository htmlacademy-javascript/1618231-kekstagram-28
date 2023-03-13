import {picturesData} from './data.js';

const pisturesListElement = document.querySelector('.pictures');

const fragment = document.createDocumentFragment();
const templateFragment = document.querySelector('#picture').content;
const template = templateFragment.querySelector('.picture');

const getPicturesElement = ({id, url, likes, comments}) => {
  const element = template.cloneNode(true);
  element.querySelector('.picture__img').src = url;
  element.querySelector('.picture__comments').textContent = comments.length;
  element.querySelector('.picture__likes').textContent = likes;
  element.dataset.picture = id;
  return element;
};

const getPictureList = (images) => {
  images.forEach((image) => {
    fragment.append(getPicturesElement(image));
  });
  pisturesListElement.append(fragment);
};

getPictureList(picturesData);

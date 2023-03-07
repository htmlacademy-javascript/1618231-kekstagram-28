import {pictures} from './data.js';

const pisturesListElement = document.querySelector('.pictures');

const templateFragment = document.querySelector('#picture').content;
const template = templateFragment.querySelector('.picture');

const getPicturesElement = ({id, url, likes, comments}) => {
  const element = template.cloneNode(true);
  element.querySelector('.picture__img').src = url;
  element.querySelector('.picture__comments').textContent = comments.length;
  element.querySelector('.picture__likes').textContent = likes;
  element.setAttribute('data-picture', `${id}`);
  return element;
};

const getPictureList = (images) => {
  images.forEach((image) => {
    pisturesListElement.append(getPicturesElement(image));
  });
};

getPictureList(pictures);

import { renderPicturesList } from './filters.js';

const TIME_OUT = 3000;
const picturesData = [];
const templateFragment = document.querySelector('#send-error').content;
const template = templateFragment.querySelector('.send-error');

const onSuccess = (images) => {
  images.forEach((item) => picturesData.push(item));
  renderPicturesList(images);
};

const onError = () => {
  const fragment = document.createDocumentFragment();
  const element = template.cloneNode(true);
  fragment.append(element);
  document.body.append(fragment);
  setTimeout(() => {
    document.querySelector('.send-error').remove();
  }, TIME_OUT);
};

export {picturesData, onSuccess, onError};

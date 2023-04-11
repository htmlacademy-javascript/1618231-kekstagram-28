import { picturesData } from './pictures.js';
import { removeDomElement, shuffle, debounce } from './utils.js';

const FILTER_DEFAULT = 'filter-default';
const FILTER_RANDOM = 'filter-random';
const FILTER_DISCUSSED = 'filter-discussed';
const MAX_RANDOM_IMAGE = 10;
const TIME_DALAY = 500;

const imgFilterSection = document.querySelector('.img-filters');
const filterButtons = imgFilterSection.querySelectorAll('.img-filters__button');
const picturesList = document.querySelector('.pictures');
const templateFragment = document.querySelector('#picture').content;
const template = templateFragment.querySelector('.picture');


const showImgFilterSection = () => {
  imgFilterSection.classList.remove('img-filters--inactive');
};

const getPicturesElement = ({id, url, likes, comments}) => {
  const element = template.cloneNode(true);
  element.querySelector('.picture__img').src = url;
  element.querySelector('.picture__comments').textContent = comments.length;
  element.querySelector('.picture__likes').textContent = likes;
  element.querySelector('.picture__img').dataset.image = id;
  element.dataset.picture = id;
  return element;
};

const renderPicturesList = (images) => {
  const fragment = document.createDocumentFragment();
  images.forEach((image) => {
    fragment.append(getPicturesElement(image));
  });
  picturesList.append(fragment);
};

const filterDefault = () => {
  const imageList = document.querySelectorAll('.picture');
  removeDomElement(imageList);
  renderPicturesList(picturesData);
};

const filterRandom = () => {
  const imageList = document.querySelectorAll('.picture');
  removeDomElement(imageList);
  const copyPicturesData = picturesData.slice();
  shuffle(copyPicturesData);
  renderPicturesList(copyPicturesData.slice(0, MAX_RANDOM_IMAGE));
};

const filterDiscussed = () => {
  const imageList = document.querySelectorAll('.picture');
  removeDomElement(imageList);
  const copyPicturesData = picturesData.slice();
  copyPicturesData.sort((first, second) => second.comments.length - first.comments.length);
  renderPicturesList(copyPicturesData);
};

const changeFilter = debounce((evt) => {
  const button = evt.target.closest('button');
  if (button.id === FILTER_DEFAULT) {
    filterDefault();
  }
  if (button.id === FILTER_RANDOM) {
    filterRandom();
  }
  if (button.id === FILTER_DISCUSSED) {
    filterDiscussed();
  }
}, TIME_DALAY);

const onFilterButtonsClick = (evt) => {
  const button = evt.target.closest('button');
  if (button) {
    filterButtons.forEach((element) => {
      element.classList.remove('img-filters__button--active');
    });
    button.classList.add('img-filters__button--active');
  }
  changeFilter(evt);
};

imgFilterSection.addEventListener('click', onFilterButtonsClick);

export {showImgFilterSection, renderPicturesList};

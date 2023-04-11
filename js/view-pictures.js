import { picturesData } from './pictures.js';
import { bigPictureSection } from './event-pictures.js';


const STEP = 5;
const IMG_WIDTH = '35';
const IMG_HEIGHT = '35';
const commentsLoaderBtn = document.querySelector('.comments-loader');
let numberComments;

const getCommentsCountBlock = (comments) => {
  const socialCommentsItems = bigPictureSection.querySelectorAll('.social__comment');
  const socialCommentCount = bigPictureSection.querySelector('.social__comment-count');
  socialCommentCount.innerHTML = '';
  const fragment = document.createDocumentFragment();
  const commentsCountBlock = document.createRange().createContextualFragment(`
  <div class="social__comment-count">
    ${socialCommentsItems.length} из <span class="comments-count">${comments.length}</span> комментариев
  </div>
  `);
  fragment.append(commentsCountBlock);
  socialCommentCount.append(fragment);
  if (socialCommentsItems.length === comments.length) {
    commentsLoaderBtn.classList.add('hidden');
  }
};

const getCommentsList = (comments) => {
  const fragment = document.createDocumentFragment();
  comments.forEach(({avatar, message, name}) => {
    const commentsItem = document.createElement('li');
    commentsItem.classList.add('social__comment');
    const image = document.createElement('img');
    image.classList.add('social__picture');
    image.src = avatar;
    image.alt = name;
    image.width = IMG_WIDTH;
    image.height = IMG_HEIGHT;
    const socialText = document.createElement('p');
    socialText.classList.add('social__text');
    socialText.textContent = message;
    commentsItem.append(image, socialText);
    fragment.append(commentsItem);
  });
  return fragment;
};

const showBigPicturePreview = (element) => {
  numberComments = 5;
  commentsLoaderBtn.classList.remove('hidden');
  const bigPictureImage = bigPictureSection.querySelector('.big-picture__img img');
  const likesCount = bigPictureSection.querySelector('.likes-count');
  const socialCommentsList = bigPictureSection.querySelector('.social__comments');
  const socialCaption = bigPictureSection.querySelector('.social__caption');
  const imageData = picturesData.find((item) => item.id === parseInt(element.dataset.picture, 10));
  const {id, url, likes, comments, description} = imageData;
  const commentsOnPage = comments.slice(0, numberComments);
  socialCommentsList.innerHTML = '';
  bigPictureImage.dataset.imageId = id;
  bigPictureImage.src = url;
  likesCount.textContent = likes;
  socialCaption.textContent = description;
  socialCommentsList.append(getCommentsList(commentsOnPage));
  getCommentsCountBlock(comments);
};

const onLoadCommentBtnClick = (evt) => {
  const element = evt.target.closest('.big-picture');
  const imageId = element.querySelector('.big-picture__img img').dataset.imageId;
  const socialCommentsList = bigPictureSection.querySelector('.social__comments');
  const imageData = picturesData.find((item) => item.id === parseInt(imageId, 10));
  const {comments} = imageData;
  numberComments += STEP;
  const commentsOnPage = comments.slice(0, numberComments);
  socialCommentsList.innerHTML = '';
  socialCommentsList.append(getCommentsList(commentsOnPage));
  getCommentsCountBlock(comments);
};

commentsLoaderBtn.addEventListener('click', onLoadCommentBtnClick);

export {showBigPicturePreview};

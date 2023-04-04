import { picturesData } from './pictures.js';
import { bigPictureSection } from './event-pictures.js';

let NUMBER_COMMENTS = 0;
const STEP = 5;
const commentsLoaderBtn = document.querySelector('.comments-loader');

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
    const commentsItem = document.createRange().createContextualFragment(`
    <li class="social__comment">
      <img
        class="social__picture"
        src= ${avatar}
        alt= "${name}"
        width="35" height="35">
      <p class="social__text">${message}</p>
    </li>
    `);
    fragment.append(commentsItem);
  });
  return fragment;
};

const showBigPicturePreview = (element) => {
  NUMBER_COMMENTS = 5;
  commentsLoaderBtn.classList.remove('hidden');
  const bigPictureImage = bigPictureSection.querySelector('.big-picture__img img');
  const likesCount = bigPictureSection.querySelector('.likes-count');
  const socialCommentsList = bigPictureSection.querySelector('.social__comments');
  const socialCaption = bigPictureSection.querySelector('.social__caption');
  const imageData = picturesData.find((item) => item.id === parseInt(element.dataset.picture, 10));
  const {url, likes, comments, description} = imageData;
  const commentsOnPage = comments.slice(0, NUMBER_COMMENTS);
  socialCommentsList.innerHTML = '';
  bigPictureImage.src = url;
  likesCount.textContent = likes;
  socialCaption.textContent = description;
  socialCommentsList.append(getCommentsList(commentsOnPage));
  getCommentsCountBlock(comments);
};

const addCommentsOnPage = (evt) => {
  const element = evt.target.closest('.big-picture');
  const imagePath = element.querySelector('.big-picture__img img').src;
  const socialCommentsList = bigPictureSection.querySelector('.social__comments');
  const imageData = picturesData.find((item) => imagePath.includes(item.url));
  const {comments} = imageData;
  NUMBER_COMMENTS += STEP;
  const commentsOnPage = comments.slice(0, NUMBER_COMMENTS);
  socialCommentsList.innerHTML = '';
  socialCommentsList.append(getCommentsList(commentsOnPage));
  getCommentsCountBlock(comments);
};

commentsLoaderBtn.addEventListener('click', addCommentsOnPage);

export {showBigPicturePreview};

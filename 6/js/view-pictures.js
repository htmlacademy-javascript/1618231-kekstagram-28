import { picturesData } from './data.js';
import { bigPictureSection } from './event-pictures.js';

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
  const bigPictureImage = bigPictureSection.querySelector('.big-picture__img img');
  const likesCount = bigPictureSection.querySelector('.likes-count');
  const commentsCount = bigPictureSection.querySelector('.comments-count');
  const socialCommentsList = bigPictureSection.querySelector('.social__comments');
  const imageData = picturesData.find((item) => item.id === parseInt(element.dataset.picture, 10));
  const {url, likes, comments} = imageData;
  socialCommentsList.innerHTML = '';
  bigPictureImage.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  socialCommentsList.append(getCommentsList(comments));

  bigPictureSection.querySelector('.social__comment-count').classList.add('hidden');
  bigPictureSection.querySelector('.comments-loader').classList.add('hidden');
};

export {showBigPicturePreview};

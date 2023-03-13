import { isEscape } from './utils.js';
import { showBigPicturePreview } from './view-pictures.js';

const picturesList = document.querySelector('.pictures');
const bigPictureSection = document.querySelector('.big-picture');
const pictureCancelBtn = bigPictureSection.querySelector('#picture-cancel');

const onDocumentKeydown = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    bigPictureSection.classList.add('hidden');
  }
  document.removeEventListener('keydown', onDocumentKeydown);
};

const closeImageViewing = () => {
  bigPictureSection.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.classList.remove('modal-open');
};

const openImageViewing = () => {
  bigPictureSection.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.classList.add('modal-open');
};

picturesList.addEventListener('click', (evt) => {
  const element = evt.target.closest('.picture');
  if (element) {
    openImageViewing();
    showBigPicturePreview(element);
  }
});

pictureCancelBtn.addEventListener('click', closeImageViewing);

export {bigPictureSection};

import { isEscape } from './utils.js';
import { textHashtags, textDescription } from './form-validation.js';

const EMPTY_STRING = '';
const imgUploadSection = document.querySelector('.img-upload');
const uploadFileInput = imgUploadSection.querySelector('#upload-file');
const imgUploadOverlay = imgUploadSection.querySelector('.img-upload__overlay');
const upLoudCancelBtn = imgUploadSection.querySelector('#upload-cancel');

const onDocumentKeydown = (evt) => {
  if (document.activeElement === textHashtags || document.activeElement === textDescription) {
    return;
  }
  if (isEscape(evt)) {
    evt.preventDefault();
    uploadFileInput.value = EMPTY_STRING;
    imgUploadOverlay.classList.add('hidden');
  }
  document.removeEventListener('keydown', onDocumentKeydown);
};

const showImageAddForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeImgUploadOverlay = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFileInput.value = EMPTY_STRING;
  document.removeEventListener('keydown', onDocumentKeydown);
};

uploadFileInput.addEventListener('input', showImageAddForm);
upLoudCancelBtn.addEventListener('click', closeImgUploadOverlay);

export {imgUploadSection};

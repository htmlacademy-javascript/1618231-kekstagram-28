import { isEscape } from './utils.js';
import { textHashtags, textDescription, imgUploadForm } from './form-validation.js';
import { uploadImage } from './edit-picture.js';
import { effectLevel } from './effects.js';

const EMPTY_STRING = '';
const FILE_TYPES = ['png', 'jpg', 'jpeg'];
const imgUploadSection = document.querySelector('.img-upload');
const uploadFileInput = imgUploadSection.querySelector('#upload-file');
const imgUploadOverlay = imgUploadSection.querySelector('.img-upload__overlay');
const upLoudCancelBtn = imgUploadSection.querySelector('#upload-cancel');
const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview');
const imgUpload = imgUploadForm.querySelector('.img-upload__preview img');
const effectsRadio = imgUploadForm.querySelectorAll('.effects__radio');

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
  imgUploadPreview.removeAttribute('class');
  imgUploadPreview.classList.add('img-upload__preview');
  uploadImage.style.transform = 'scale(1)';
  imgUploadPreview.style.filter = '';
  effectLevel.classList.add('visually-hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeImgUploadOverlay = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFileInput.value = EMPTY_STRING;
  imgUploadPreview.removeAttribute('class');
  imgUploadPreview.style.filter = '';
  imgUploadPreview.classList.add('img-upload__preview');
  textHashtags.value = EMPTY_STRING;
  textDescription.value = EMPTY_STRING;
  effectsRadio.forEach((item) => {
    item.checked = false;
  });
  effectsRadio[0].checked = true;
  document.removeEventListener('keydown', onDocumentKeydown);
};

const loadFile = () => {
  const file = uploadFileInput.files[0];
  const fileName = file.name.toLowerCase();
  const isTypeFile = FILE_TYPES.some((item) => fileName.endsWith(item));
  if (isTypeFile) {
    imgUpload.src = URL.createObjectURL(file);
  }
};

uploadFileInput.addEventListener('input', () => {
  showImageAddForm();
  loadFile();
});

upLoudCancelBtn.addEventListener('click', closeImgUploadOverlay);

export {imgUploadSection, closeImgUploadOverlay, onDocumentKeydown};

import { request } from './api.js';
import { closeImgUploadOverlay } from './upload-file.js';
import { showAlert } from './modal.js';

const START_HASHTAG = 'Хэш-тег должен начинается с символа # (решётка)';
const LENGTH_FIELD = 'Поле должно содержать не более пяти хэш-тегов';
const LENGTH_HASHTAG = 'Длина хэш-тега не лолжна превышать 20 символов';
const LENGTH_DESCRIPTION = 'Длина комментария не должна превышать 140 символов';
const VALIDE_SINTAX = 'Cтрока после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы, символы пунктуации.';
const DUBLICATION_HASHTAG = 'Один и тот же хэш-тег не может быть использован дважды';
const MAX_LENGTH_HASHTAG = 20;
const MAX_LENGTH_DESCRIPTION = 140;
const REGEX_SINTAX = /^#[a-zа-яё0-9]+$/;
const SUCCESS = 'success';
const ERROR = 'error';

const imgUploadForm = document.querySelector('#upload-select-image');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const textDescription = imgUploadForm.querySelector('.text__description');
const submitButton = imgUploadForm.querySelector('#upload-submit');


const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
});

const isStartHashtag = (value) => {
  const hashTags = value.toLowerCase().trim().split(/\s+/);
  if (value === '') {
    return true;
  }
  return !(hashTags.some((item) => item[0] !== '#'));
};

const checkLengthField = (value) => {
  const hashTags = value.toLowerCase().trim().split(/\s+/);
  return hashTags.length <= 5;
};

const checkLengthHashtag = (value) => {
  const hashTags = value.toLowerCase().trim().split(/\s+/);
  return !(hashTags.some((item) => item.length > MAX_LENGTH_HASHTAG));
};

const isValidateSintax = (value) => {
  const hashTags = value.toLowerCase().trim().split(/\s+/);
  if (value === '') {
    return true;
  }
  return !(hashTags.some((item) => !REGEX_SINTAX.test(item)));
};

const hasDublicationHashtag = (value) => {
  const hashTags = value.toLowerCase().trim().split(/\s+/);
  return new Set(hashTags).size === hashTags.length;
};

const checkLengthDescription = (value) => value.length <= MAX_LENGTH_DESCRIPTION;

pristine.addValidator(textHashtags,
  isStartHashtag,
  START_HASHTAG
);

pristine.addValidator(textHashtags,
  checkLengthField,
  LENGTH_FIELD
);

pristine.addValidator(textHashtags,
  checkLengthHashtag,
  LENGTH_HASHTAG
);

pristine.addValidator(textHashtags,
  isValidateSintax,
  VALIDE_SINTAX
);

pristine.addValidator(textHashtags,
  hasDublicationHashtag,
  DUBLICATION_HASHTAG
);

pristine.addValidator(textDescription,
  checkLengthDescription,
  LENGTH_DESCRIPTION
);

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unBlockSubmitButton = () => {
  submitButton.disabled = false;
};

const onSucces = () => {
  unBlockSubmitButton();
  closeImgUploadOverlay();
  showAlert(SUCCESS);
};

const onError = () => {
  unBlockSubmitButton();
  showAlert(ERROR);
};

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (!pristine.validate()) {
    return;
  }
  blockSubmitButton();
  const data = new FormData(imgUploadForm);
  request(onSucces, onError, 'POST', data);
});

textHashtags.addEventListener('input', () => {
  if (textHashtags.value === '') {
    pristine.reset();
  }
});
export {textHashtags, textDescription, imgUploadForm};

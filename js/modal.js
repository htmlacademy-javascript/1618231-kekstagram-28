import { isEscape } from './utils.js';
import { onDocumentKeydown } from './upload-file.js';

const onKeydown = (evt) => {
  evt.preventDefault();
  if (isEscape(evt)) {
    evt.preventDefault();
    if (document.querySelector('.success')) {
      document.querySelector('.success').remove();
    }
    if (document.querySelector('.error')) {
      document.querySelector('.error').remove();
    }
  }
  document.removeEventListener('keydown', onKeydown);
};

const sectionAlertEvent = (section) => {
  const button = section.querySelector('button');
  button.addEventListener('click', () => {
    section.remove();
  });
  document.addEventListener('click', () => {
    section.remove();
  });
};

const showAlert = (param) => {
  const fragment = document.createDocumentFragment();
  const templateFragment = document.querySelector(`#${param}`).content;
  const template = templateFragment.querySelector(`.${param}`);
  const section = template.cloneNode(true);
  fragment.append(section);
  document.body.append(fragment);
  sectionAlertEvent(section);
  document.removeEventListener('keydown', onDocumentKeydown);
  document.addEventListener('keydown', onKeydown);
};

export { showAlert};

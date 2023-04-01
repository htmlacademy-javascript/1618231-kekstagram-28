import { request } from './api.js';
import {onSucces, onError} from './pictures.js';
import { showImgFilterSection } from './filters.js';
import './event-pictures.js';
import './upload-file.js';
import './form-validation.js';
import './effects.js';


window.addEventListener('DOMContentLoaded', () => {
  request(onSucces, onError, 'GET');
  showImgFilterSection();
});

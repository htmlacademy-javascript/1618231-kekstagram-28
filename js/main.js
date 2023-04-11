import { request } from './api.js';
import {onSuccess, onError} from './pictures.js';
import { showImgFilterSection } from './filters.js';
import './event-pictures.js';
import './upload-file.js';
import './form-validation.js';
import './effects.js';

request(onSuccess, onError, 'GET');
showImgFilterSection();

import { loadDataFromServer } from './api.js';
import './event-pictures.js';
import './upload-file.js';
import './form-validation.js';

const URL = 'https://28.javascript.pages.academy/kekstagram/data';


window.addEventListener('DOMContentLoaded', loadDataFromServer(URL));



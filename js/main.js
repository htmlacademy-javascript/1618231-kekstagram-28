import { loadDataFromServer } from './api.js';
import './event-pictures.js';

const URL = 'https://28.javascript.pages.academy/kekstagram/data';

window.addEventListener('DOMContentLoaded', loadDataFromServer(URL));

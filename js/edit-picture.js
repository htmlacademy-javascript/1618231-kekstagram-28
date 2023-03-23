import { imgUploadForm } from './form-validation.js';

const STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

const imgUploadScale = imgUploadForm.querySelector('.img-upload__scale');
const uploadImage = imgUploadForm.querySelector('.img-upload__preview img');

uploadImage.style.transition = 'transform 0.5s ease';

const onBtnSmalerClick = (element, value) => {
  if (value > SCALE_MIN) {
    value -= STEP;
    element.value = `${value}%`;
    uploadImage.style.transform = `scale(${value / 100})`;
  }
};

const onBtnBiggerClick = (element, value) => {
  if (value < SCALE_MAX) {
    value += STEP;
    element.value = `${value}%`;
    uploadImage.style.transform = `scale(${value / 100})`;
  }
};

const onScaleControlBtnClick = (evt) => {
  const elementBtn = evt.target;
  const scaleControl = imgUploadForm.querySelector('.scale__control--value');
  const scaleControlValue = parseInt(scaleControl.value, 10);
  if (elementBtn.classList.contains('scale__control--smaller')) {
    onBtnSmalerClick(scaleControl,scaleControlValue);
  }
  if (elementBtn.classList.contains('scale__control--bigger')) {
    onBtnBiggerClick(scaleControl,scaleControlValue);
  }
};

imgUploadScale.addEventListener('click', onScaleControlBtnClick);

export {uploadImage};

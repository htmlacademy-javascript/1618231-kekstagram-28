import { imgUploadForm } from './form-validation.js';

const STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

const imgUploadScale = imgUploadForm.querySelector('.img-upload__scale');
const uploadImage = imgUploadForm.querySelector('.img-upload__preview img');

uploadImage.style.transition = 'transform 0.5s ease';

const onButtonsZoomClick = (element, value) => {
  element.value = `${value}%`;
  uploadImage.style.transform = `scale(${value / 100})`;
};

const onScaleControlBtnClick = (evt) => {
  const elementBtn = evt.target;
  const scaleControl = imgUploadForm.querySelector('.scale__control--value');
  let scaleControlValue = parseInt(scaleControl.value, 10);
  if (elementBtn.classList.contains('scale__control--smaller')) {
    if (scaleControlValue > SCALE_MIN) {
      scaleControlValue -= STEP;
      onButtonsZoomClick(scaleControl, scaleControlValue);
    }
  }
  if (elementBtn.classList.contains('scale__control--bigger')) {
    if (scaleControlValue < SCALE_MAX) {
      scaleControlValue += STEP;
      onButtonsZoomClick(scaleControl, scaleControlValue);
    }
  }
};

imgUploadScale.addEventListener('click', onScaleControlBtnClick);

export {uploadImage};

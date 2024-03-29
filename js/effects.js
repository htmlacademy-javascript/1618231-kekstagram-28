import { imgUploadForm } from './form-validation.js';

const EFFECT_NONE = 'none';
const EFFECT_CHROME = 'chrome';
const EFFECT_SEPIA = 'sepia';
const EFFECT_MARVIN = 'marvin';
const EFFECT_PHOBOS = 'phobos';
const EFFECT_HEAT = 'heat';

const effectLevel = imgUploadForm.querySelector('.effect-level');
const effectLevelValue = imgUploadForm.querySelector('.effect-level__value');
const effectLevelSlider = imgUploadForm.querySelector('.effect-level__slider');
const effectsList = imgUploadForm.querySelector('.effects__list');
const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview');
const effectItemsInput = effectsList.querySelectorAll('.effects__item input');

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

const effectsSlider = {
  'marvin': () => {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
      connect: 'lower'
    });
  },
  'phobos': () => {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
      connect: 'lower'
    });
  },
  'heat': () => {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
      connect: 'lower'
    });
  },
  'chrome': () => {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      connect: 'lower'
    });
  },
  'sepia': () => {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      connect: 'lower'
    });
  },
  'none': () => {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      connect: 'lower'
    });
  }
};

const getNameEffect = (element) => element.id.replace(/effect-/, '');


const showSlider = (effect) => {
  if (effect === EFFECT_NONE) {
    effectLevel.classList.add('visually-hidden');
  } else {
    effectLevel.classList.remove('visually-hidden');
  }
};

const editEffect = (effect) => {
  effectLevelSlider.noUiSlider.on('update', () => {
    const value = effectLevelSlider.noUiSlider.get();
    effectLevelValue.value = value;
    if (effect === EFFECT_CHROME) {
      imgUploadPreview.style.filter = `grayscale(${value})`;
    }
    if (effect === EFFECT_SEPIA) {
      imgUploadPreview.style.filter = `sepia(${value})`;
    }
    if (effect === EFFECT_MARVIN) {
      imgUploadPreview.style.filter = `invert(${value}%)`;
    }
    if (effect === EFFECT_PHOBOS) {
      imgUploadPreview.style.filter = `blur(${value}px)`;
    }
    if (effect === EFFECT_HEAT) {
      imgUploadPreview.style.filter = `brightness(${value})`;
    }
    if (effect === EFFECT_NONE) {
      imgUploadPreview.style.filter = '';
    }
  });
};

const onEffectButtonClick = (evt) => {
  const element = evt.target;
  const nameEffect = getNameEffect(element);
  effectsSlider[nameEffect]();
  showSlider(nameEffect);
  editEffect(nameEffect);
};

effectItemsInput.forEach((item) => {
  item.addEventListener('change', onEffectButtonClick);
});

export {effectLevel};

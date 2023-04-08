const isEscape = (evt) => evt.key === 'Escape';

const removeDomElement = (elements) => {
  if (elements.length > 1) {
    elements.forEach((element) => {
      element.remove();
    });
  } else {
    elements.remove();
  }
};

const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};


export {isEscape, removeDomElement, shuffle, debounce};

const TIME_OUT = 3000;
const pisturesListElement = document.querySelector('.pictures');
let picturesData;

const templateFragment = document.querySelector('#picture').content;
const template = templateFragment.querySelector('.picture');

const getPicturesElement = ({id, url, likes, comments}) => {
  const element = template.cloneNode(true);
  element.querySelector('.picture__img').src = url;
  element.querySelector('.picture__comments').textContent = comments.length;
  element.querySelector('.picture__likes').textContent = likes;
  element.dataset.picture = id;
  return element;
};

const onSucces = (images) => {
  const fragment = document.createDocumentFragment();
  picturesData = images.slice();
  images.forEach((image) => {
    fragment.append(getPicturesElement(image));
  });
  pisturesListElement.append(fragment);
};

const onError = () => {
  const fragment = document.createDocumentFragment();
  const sendError = document.createRange().createContextualFragment(`
  <section class="send-error">
  <div class="send-error__inner">
    <h2 class="send-error__title">Ошибка загрузки изображений.</h2>
    <p class="send-error__discription">Поверьте интернет - соединение</p>
  </div>
</section>
  `);
  fragment.append(sendError);
  document.body.append(fragment);
  setTimeout(() => {
    document.querySelector('.send-error').remove();
  }, TIME_OUT);
};

export {picturesData, onSucces, onError};

import { renderPicturesList } from './filters.js';

const TIME_OUT = 3000;
let picturesData;

const onSucces = (images) => {
  picturesData = images.slice();
  renderPicturesList(images);
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

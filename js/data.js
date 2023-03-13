import {getRandomInt, getNambersFromString} from './utils.js';

const MIN_LENGTH = 1;
const MAX_LENGTH = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 1;
const MAX_COMMENTS = 2;
const MAX_ID_COMMENT = 1000;
const MIN_AVATAR = 1;
const MAX_AVATAR = 6;

const DESCRIPTIONS = [
  'Вид на санаторий со стороны провала',
  'Триумфальная арка',
  'Зеленая лагуна',
  'А еще у меня есть фотоаппарат',
  'Рисовые близнецы',
  'Baby you can drive my car',
  'Клубничка',
  'Натюрморт',
  'Первым делом самолеты!',
  'Порядок',
  'Мечта',
  'Вот, во что превратился Хорьх',
  'Салат',
  'Кэтбургер',
  'Книги на столе',
  'Глубина',
  'Вас много, я один',
  'The Real America',
  'HighTech',
  ' Welcome to the Hotel California',
  'Лучшее блюдо',
  'Sunshine Reggae',
  'Себастьян',
  'Руки вверх',
  'Хочу такую!'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Артем',
  'Джагер',
  'Дядя Ваня',
  'Юнонна',
  'Дмитрий М.Нос',
  'Пенсионер',
];

let string = '';

const createRandomInt = (min, max) => {
  const previosValues = [];
  return () => {
    let currentValue = getRandomInt(min, max);
    if (previosValues.length >= (max - min + 1)) {
      return null;
    }
    while (previosValues.includes(currentValue)) {
      currentValue = getRandomInt(min, max);
    }
    previosValues.push(currentValue);
    return currentValue;
  };
};

const generateId = createRandomInt(MIN_LENGTH, MAX_LENGTH);

const generateUrlPhoto = createRandomInt(MIN_LENGTH, MAX_LENGTH);

const generateIdComment = createRandomInt(MIN_LENGTH, MAX_ID_COMMENT);

const getUrlPhoto = () => {
  string = `photos/${generateUrlPhoto()}.jpg`;
  return string;
};

const getDescriptionForPhotos = () => {
  const index = getNambersFromString(string);
  return DESCRIPTIONS[index - 1];
};

const getUrlAvatar = () => `img/avatar-${getRandomInt(MIN_AVATAR, MAX_AVATAR)}.svg`;

const getMessages = () => {
  const index = getRandomInt(MIN_LENGTH, MESSAGES.length - 1);
  return MESSAGES[index];
};

const getNameComment = () => {
  const index = getRandomInt(MIN_LENGTH, NAMES.length - 1);
  return NAMES[index];
};

const getCommentsArray = () => {
  const commentsCollection = [];
  for (let i = MIN_COMMENTS; i <= MAX_COMMENTS; i++) {
    const commentItem = {
      id: generateIdComment(),
      avatar: getUrlAvatar(),
      message: getMessages(),
      name: getNameComment(),
    };
    commentsCollection.push(commentItem);
  }
  return commentsCollection;
};

const getPhotosArray = () => {
  const photoCollection = [];
  for (let i = MIN_LENGTH; i <= MAX_LENGTH; i++) {
    const photoItem = {
      id: generateId(),
      url: getUrlPhoto(),
      description: getDescriptionForPhotos(),
      likes: getRandomInt(MIN_LIKES, MAX_LIKES),
      comments: getCommentsArray(),
    };
    photoCollection.push(photoItem);
  }
  return photoCollection;
};

const picturesData = getPhotosArray();

export {picturesData};

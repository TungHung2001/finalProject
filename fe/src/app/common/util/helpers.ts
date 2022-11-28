import {Post} from '../../models/post';
import moment from 'moment';

export const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

export function convertToSlug(str = '') {
  if (!str?.toLowerCase) {
    return '';
  }
  return str.toLowerCase()
  // eslint-disable-next-line
  .replace(/[\x00-\x2F\x3A-\x40\x5B-\x60\x7B-\xBF]+/g, '-')
  .replace(/^-+/, '')
  .replace(/-+$/, '');
}

export const getImageUrl = (src: string) => {
  if (src && src.startsWith('http')) {
    return src;
  }
  return `${process.env.REACT_APP_IMAGE_URL}${src}`;
};

export const getPostUrl = (post: Post) => {
  const slug = convertToSlug(post.title) + '-' + post.id;
  return `/p/${slug}`;
};

export const getTotalPage = (totalItem: number, pageSize: number) => {
  if (totalItem === 0 || pageSize === 0) {
    return 1;
  }
  return Math.ceil(totalItem / pageSize);
};

export const getInnerText = (htmlContent: string = '') => {
  const d = document.createElement('DIV');
  d.innerHTML = htmlContent;
  return d.innerText;
};

export const timeToNow = (timestamp = 0, showTime = false) => {
  if (!timestamp) {
    return '';
  }
  const r = moment(timestamp, 'x');
  const now = moment();
  let result = '';
  if (now.isSame(r, 'day')) {
    result = 'Today';
  } else if (now.subtract(1, 'day').isSame(r, 'day')) {
    result = 'Yesterday';
  } else {
    result = r.format('DD/MM/YYYY');
  }
  if (showTime && result) {
    result += ' at ' + r.format('hh:mmA');
  }
  return result;
};

export const formatDate = (timestamp = 0, format = 'DD/MM/YYYY HH:mm:ss') => {
  if (!timestamp) {
    return '';
  }
  const r = moment(timestamp, 'x');
  return r.format(format);
};

export function validatePassword(password = '') {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const r = {
    length: false,
    lowercaseUppercase: false,
    specialCharacter: false,
    number: false,
  };
  if (!password || password.length < 6) {
    r.length = true;
  }
  if (!password || password.toUpperCase() === password) {
    r.lowercaseUppercase = true;
  }
  if (!password || password.toLowerCase() === password) {
    r.lowercaseUppercase = true;
  }
  if (!password || !specialChars.test(password)) {
    r.specialCharacter = true;
  }
  if (!password || !(/\d/.test(password))) {
    r.number = true;
  }
  return r;
}

'use strict';
import Notiflix from 'notiflix';

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

import SlimSelect from 'slim-select';

const breedSelectRef = document.querySelector('.breed-select');

const loaderRef = document.querySelector('.loader');

const errorRef = document.querySelector('.error');

function optionValue(data) {
  return data
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

fetchBreeds()
  .then(data => {
    const breeds = data;

    breedSelectRef.innerHTML = optionValue(breeds);
    new SlimSelect({
      select: '.breed-select',
    });
  })
  .catch(error => {
    console.error(error);
  });

fetchCatByBreed()
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });

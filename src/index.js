import Notiflix from 'notiflix';

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

import SlimSelect from 'slim-select';
import './common.css';

const breedSelectRef = document.querySelector('.breed-select');

const loaderRef = document.querySelector('.loader');

const catInfoRef = document.querySelector('.cat-info');

const errorRef = document.querySelector('.error');

breedSelectRef.addEventListener('change', targetSelectClickHandler);

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
    showErrorRef();
    console.error(error);
  });
hideLoader();
hideErrorRef();
function targetSelectClickHandler(event) {
  const breedId = event.target.value;

  showLoader();

  fetchCatByBreed(breedId)
    .then(breedId => {
      renderMarkingsByBreed(breedId);
      hideLoader();
    })
    .catch(error => {
      showErrorRef();
      hideLoader();
      console.error(error);
    });
}

function renderMarkingsByBreed(breedId) {
  const markup = breedId
    .map(
      ({
        breeds: [{ name, description, temperament }],
        url,
      }) => `<div class="bloc">
     <div class="centered-image"><img src="${url}" alt="Cat"></div>
        <div class="list"><h3>${name}</h3>
        <p>${description}</p>
        <p>${temperament}</p></div>
    </div>`
    )
    .join('');
  catInfoRef.innerHTML = markup;
}
function showLoader() {
  loaderRef.style.display = 'block';
}

function hideLoader() {
  loaderRef.style.display = 'none';
}

function hideErrorRef() {
  errorRef.style.display = 'none';
}

function showErrorRef() {
  errorRef.style.display = 'block';
}

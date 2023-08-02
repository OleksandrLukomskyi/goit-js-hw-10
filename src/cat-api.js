import axios from 'axios';
export const BASE_URL = 'https://api.thecatapi.com/v1';
const BASE_API_KEY =
  'live_l4oFHwYqXrdWUi6mCDmY77hCUDKkXqq1McnDOTNK5Ri2Z7a7ORbbogINx3xsWuu0';
axios.defaults.headers.common['x-api-key'] = BASE_API_KEY;

export function fetchBreeds() {
  return axios
    .get(`${BASE_URL}/breeds`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
}

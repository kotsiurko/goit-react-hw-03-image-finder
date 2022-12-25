const API_KEY = '31497925-3da7c0b5792e88873a0201f19';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = (requestInfo, page, perPage) => {
  return fetch(
    `${BASE_URL}?&q=${requestInfo}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`No response from server`));
  });
};

export default fetchImages;

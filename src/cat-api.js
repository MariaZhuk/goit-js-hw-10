import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_8i4TyynOZPrFjho4CDbA0laJ6JwIAd9ccPt7MMuLTXCXgSal17fPjjbSrGHaPAxV";

const BASE_URL = 'https://api.thecatapi.com/v1/';

const END_POINT_BREEDS = 'breeds';
const END_POINT_SEARCH = 'images/search';

//запрос на сервер до всіх котиків

export function fetchBreeds() {

    return axios.get(`${BASE_URL}${END_POINT_BREEDS}`)
    
}

//функція повернення інфо по кожному котику по айді
export function fetchCatByBreed(breedId) {
  
    return axios.get(`${BASE_URL}${END_POINT_SEARCH}?breed_ids=${breedId}`);
}
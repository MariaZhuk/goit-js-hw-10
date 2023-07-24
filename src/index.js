//Імпортуємо данні та встановлюємо бібліотки

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select'; // бібліотека для вибору котика в списку
import { Notify } from 'notiflix/build/notiflix-notify-aio'; // бібліотека відображення помилки
import 'slim-select/dist/slimselect.css';

const selectorsSearch = {
    select: document.querySelector('.breed-select'),
    tagOption: document.querySelector("option"),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    container : document.querySelector('.cat-info')
}
 
selectorsSearch.error.classList.add("hidden");
selectorsSearch.loader.classList.add("hidden");
selectorsSearch.select.setAttribute("id","slim-select");

selectorsSearch.tagOption.textContent = 'Please selected cat';

//запрос на бєкенд до колекції
fetchBreeds()
    .then((response) => {
        onSelectOptions(response.data);
        new SlimSelect({
            select: '#slim-select'
        })
    })
    .catch(onFetchError);
//прослуховувач події вибору котика, інфо якого треба відобразити

selectorsSearch.select.addEventListener("change", onSearch);

function onSearch(evt) {
   
    selectorsSearch.loader.classList.remove("hidden");
    selectorsSearch.container.innerHTML = "";

    // отримуємо якого котика обрали - його id
    // console.log(evt.target.value)
    // отримуємо данні якого котика обрали. Якщо данні по котику , запускаємо функцію відмалювання розмітки
    fetchCatByBreed(evt.target.value)
        .then((response) => {
            onSelectSearchCard(response.data[0].breeds[0], response.data[0]);
            //ховаємо напис що іде завантаження
            selectorsSearch.loader.classList.add("hidden");
        })
        .catch(onFetchError) 
            //ховаємо напис що іде завантаження
            // selectorsSearch.loader.classList.add("hidden"); 
               
}
    
//функція відображення списку всіх котиків
//arr це response.data - масив обєктів всіх котиків
function onSelectOptions(arr) {
   
    //перебираємо масив обєктів, робимо деструктуризацію
    return arr.map(({name, id}) => {
        const markUpOption = `<option value="${id}">${name}</option>`;
        
        selectorsSearch.select.insertAdjacentHTML('beforeend', markUpOption);
    });
      
};
//{name, description, temperament} - деструктуризація обєкту що приходить з response.data[0].breeds[0]
//{url} - це диструктуризація значення url з response.data[0]

//функція відображення інфо по обраному котику
function onSelectSearchCard({name, description, temperament}, {url}) {
    const markUpCard = `
    <img src="${url}" alt="${name}" width="450"/>
    <div class="search-card">
    <p class="title-card">${name}</p>
    <p class="description">${description}</p>
    <p class="cat-breed">${temperament}</p>
    </div>`;
    
    selectorsSearch.container.innerHTML = markUpCard;
}

//функція помилки
function onFetchError() { 
    selectorsSearch.loader.classList.add("hidden"); 
    Notify.failure('Oops!. Something wrong! Please try again later.', {
            position: 'top',
            timeout: 3000,
        })
}


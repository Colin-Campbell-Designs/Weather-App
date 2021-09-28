const apiKey = 'be58f40b6365c57ada68094b59ac4834';

const form = document.querySelector('#form');
const inputQuery = document.querySelector('#inputQuery');
const card__header = document.querySelector('.card__header');
const card__temp = document.querySelector('.card__temp');
const card__icon = document.querySelector('img.card__icon');
const card__dis = document.querySelector('.card__dis');
const card_container = document.querySelector('.card-container');

//clear placeholder
inputQuery.addEventListener('click', () => {
    console.log('yes')
    inputQuery.placeholder = '';
})


form.addEventListener('submit', e => {
   e.preventDefault()
   inputQuery.placeholder = 'Enter City';
   
   const city = inputQuery.value.trim().toLowerCase();

   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

   const getWeather = async () => {
       const response = await fetch(url)
       const data = response.json();
       return data;
       console.log(data)
   }

       const updateUI = async (data) => {
       const card = document.createElement('div');
       card.className = 'card';
       const card__icon = document.createElement('img');
       card__icon.classList.add('card__icon')
       card.innerHTML = `
            <p class="card__header">${data.name}<span> ${data.sys.country}</span></p>
            <p class="card__temp">${(Math.floor(data.main.temp))}<span>&#176C</span></p>
            <div class="card__dis">${data.weather[0].description}</div>
       `

       card__icon.setAttribute('src',`icons/${data.weather[0].icon}.png`)
       card.prepend(card__icon);
       card_container.appendChild(card)
   }

   getWeather().then(data => console.log(data))

   getWeather().then(data => {return updateUI(data)})


   //Clear Input
   form.reset()

})





console.log(inputQuery.placeholder)

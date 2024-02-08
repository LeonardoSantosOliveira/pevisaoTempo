const apiKey = '7cb9228c04da9564aef29b522bde422c';
const apiCountryUrl = "https://flagsapi.com/CODIGOPAIS/flat/64.png";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector('#search');

const cityelement = document.querySelector('#city')
const tempElement = document.querySelector('#temperature span')
const descElement = document.querySelector('#description')
const weatherIconElement = document.querySelector('#weather-icon')
const countryElement = document.querySelector('#country')
const umidityElement = document.querySelector('#umidity span')
const windElement = document.querySelector('#wind span')
const loaderElement = document.querySelector('#container-loader')
const bodyElement = document.querySelector('body');
const errorElement = document.querySelector('#error')


const weatherContainer = document.querySelector('#weather-data')

const getWeatherData = async cidade => {
    errorElement.style.display = "none"
    toggleLoader()
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    
    if(res.status == 404){
        errorElement.style.display = "block"
        cityInput.value = ''
    } else {
        errorElement.style.display = "none"
    }
    
    const data = await res.json();
    toggleLoader()
    return data;


}

const showWeatherData = async cidade => {
    weatherContainer.classList.add('hide');
    bodyElement.style.background = `url(${apiUnsplash}${cidade.replace(' ', '_')})`
    const data = await getWeatherData(cidade);
    
        cityelement.innerText = data.name;
        tempElement.innerText = parseInt(data.main.temp);
        descElement.innerText = data.weather[0].description;
        weatherIconElement.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
        countryElement.setAttribute('src', `https://flagsapi.com/${data.sys.country}/flat/64.png`);
        umidityElement.innerText = `${data.main.humidity}%`;
        windElement.innerText = `${data.wind.speed}km/h`;
        cityInput.value = ''
        weatherContainer.classList.remove('hide');
}

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city)
})

cityInput.addEventListener('keyup', (e) => {
    if(e.code === "Enter") {
        const city = e.target.value

        showWeatherData(city)
    }
})

const toggleLoader = () => {
    loaderElement.classList.toggle('hide');
}

let today = document.getElementById('today')
let todayDate = document.getElementById('today-date')
let cityLocation = document.getElementById('location')
let todayDegree = document.getElementById('today-degree')
let todayIcon = document.getElementById('today-icon')
let description = document.getElementById('today-description')
let humidity = document.getElementById('humidity')
let wind = document.getElementById('wind')
let compass = document.getElementById('compass')
let searchBar = document.getElementById('search-bar')

let nextDay = document.getElementsByClassName('nextDay')
let nextDayIcon = document.getElementsByClassName('nextDay-icon')
let maxDegree = document.getElementsByClassName('max-degree')
let minDegree = document.getElementsByClassName('min-degree')
let nextDayDescription = document.getElementsByClassName('nextDay-description')
let currentCity = 'cairo'

monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

async function getWeatherData() {
    apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=8dbc624780734895993162306232602&q=${currentCity}&days=3`)
    responseData = await apiResponse.json();
    displayTodayWeather();
    NextDayWeather()
    console.log(responseData);
}

function displayTodayWeather() {
    let date = new Date();
    today.innerHTML = days[date.getDay()];
    todayDate.innerHTML = `${date.getDate()} ${monthName[date.getMonth()]}`;
    cityLocation.innerHTML = responseData.location.name;
    todayDegree.innerHTML = responseData.current.temp_c;
    todayIcon.setAttribute('src', `https:${responseData.current.condition.icon}`);
    description.innerHTML = responseData.current.condition.text;
    humidity.innerHTML = responseData.current.humidity;
    wind.innerHTML = responseData.current.wind_kph;
    compass.innerHTML = responseData.current.wind_dir;
}

function NextDayWeather() {
    for (let i = 0; i < nextDay.length; i++) {
        nextDay[i].innerHTML = days[new Date(responseData.forecast.forecastday[i + 1].date).getDay()]
        nextDayIcon[i].setAttribute('src', `https:${responseData.forecast.forecastday[i+1].day.condition.icon}`)
        maxDegree[i].innerHTML = responseData.forecast.forecastday[i + 1].day.maxtemp_c
        minDegree[i].innerHTML = responseData.forecast.forecastday[i + 1].day.mintemp_c
        nextDayDescription[i].innerHTML = responseData.forecast.forecastday[i + 1].day.condition.text
    }
}

searchBar.addEventListener('keyup', function() {
    currentCity = searchBar.value
    getWeatherData()
})
getWeatherData()
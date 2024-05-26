function updateWeather (response){
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date =new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");
    
    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML=`${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML=`${response.data.wind.speed}km/h`; 
    temperatureElement.innerHTML =Math.round(temperature);
    iconElement.innerHTML= `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;
    
getWeatherForecast(response.data.city);
}
    
    function formatDate(date) {
        let minutes =date.getMinutes();
        let hours = date.getHours();
        let days =[
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        let day = days[date.getDay()];
    
        if (minutes < 10 ) { 
            minutes =`0${minutes}`;
    }
    
        return `${day} ${hours}:${minutes}`;
    }
    
    function searchCity (city) {
    let apiKey = "aa0e3obb7a4209ebdc14ff3a44818t51";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updateWeather);
    }
    
    function handleSearchSubmit (event) {
        event.preventDefault();
        let searchInput = document.querySelector("#search-form-input");
    
        searchCity(searchInput.value);
    }

function formatDay(timestamp){
    let date = new Date(timestamp*1000);
let days =["Sun", "Monday", "Tue", "Wed", "Thu", "Fri", "Sat"];

return days[date.getDay()];
}

function getWeatherForecast(city) { 
    let apiKey = "aa0e3obb7a4209ebdc14ff3a44818t51";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayWeatherForcast)
}

function displayWeatherForcast(response){
    let weatherForecastHTML="";

    response.data.daily.forEach(function (day,index) {
if (index < 5){
    weatherForecastHTML =
    weatherForecastHTML +
    `
    <div class= "forecast-day">
    <div class="forecast-date">${formatDay(day.time)}</div>

    <img src="${day.condition.icon_url}" class="forecast-icon"/>
    <div class ="forecast-temperatures">
    <div class ="forcast-temperature">
    <strong>${Math.round(day.temperature.maximum)}°</strong>
    </div>
    <div class="forecast-temperature">${Math.round(
        day.temperature.minimum
    )}°</div>
    </div>
    </div>
    `;
}   
});

let weatherForecastElement = document.querySelector("#weather-forecast");
weatherForecastElement.innerHTML = weatherForecastHTML;
}
    
    let searchFormElement = document.querySelector("#search-form");
    searchFormElement.addEventListener("submit", handleSearchSubmit);
    
    searchCity("Paris");
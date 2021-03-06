let now = new Date();

let displayDate = document.querySelector("h1");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let year = now.getFullYear();
let date = now.getDate();
let month = months[now.getMonth()];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

displayDate.innerHTML = `${day}, ${date} ${month} ${year}, ${hours}:${minutes}`;

function showTemperature(response) {
  let currentTemperature = document.querySelector("#temperature-reading");
  celsiusTemperature = response.data.main.temp;
  currentTemperature.innerHTML = `${Math.round(celsiusTemperature)}`;
  let maxTemp = document.querySelector("#max-temp");
  maxTemp.innerHTML = `${Math.round(response.data.main.temp_max)}℃`;
  let minTemp = document.querySelector("#min-temp");
  minTemp.innerHTML = `${Math.round(response.data.main.temp_min)}℃`;
  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = `${Math.round(response.data.wind.speed)}m/s`;
  let humid = document.querySelector("#humid");
  humid.innerHTML = `${Math.round(response.data.main.humidity)}%`;
  let currentCity = document.querySelector("#city-name");
  currentCity.innerHTML = `${response.data.name}`;
  let temperatureDescription = document.querySelector(
    "#temperature-description"
  );
  temperatureDescription.innerHTML = `${response.data.weather[0].description}`;
  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = "a86e9d84a9cef96d075ec236ba74b9d6";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let citySearchInput = document.querySelector("#search-city-input");
  searchCity(citySearchInput.value);
}

function retrieveLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "a86e9d84a9cef96d075ec236ba74b9d6";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrieveLocation);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureReading = document.querySelector("#temperature-reading");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureReading.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureReading = document.querySelector("#temperature-reading");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperatureReading.innerHTML = Math.round(celsiusTemperature);
}

let form = document.querySelector("#search-city-form");
form.addEventListener("submit", handleSubmit);

let button = document.querySelector("#current-button");
button.addEventListener("click", getCurrentPosition);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#link-fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#link-celsius");
celsiusLink.addEventListener("click", showCelsiusTemperature);

searchCity("Sydney");

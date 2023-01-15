let now = new Date();
let currentDate = document.querySelector(".date");
let days = [
  "Monady",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];
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

let month = months[now.getMonth()];
let date = now.getDate();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

currentDate.innerHTML = `${day}, ${date} ${month} ${hour}:${minute}`;

function showTemperature(response) {
  console.log(response.data.name);
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(city) {
  let apiKey = "80ae7f4cb5f0b318a90a29ec4c4b4386";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
  console.log(apiUrl);
}

function typeCity(event) {
  event.preventDefault();
  let city = document.querySelector(".cityInput").value;
  searchCity(city);
}

function showLocation(position) {
  let apiKey = "80ae7f4cb5f0b318a90a29ec4c4b4386";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?${position.coords.latitude}&lon=${position.coords.longtitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let button = document.querySelector("#currentLocation");
button.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#cityForm");
searchForm.addEventListener("submit", typeCity);
console.log(searchForm);

searchCity("Tehran");

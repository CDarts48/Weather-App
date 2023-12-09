const APIKey = "98cf718268619abb852c630a60f05a1e";
let searchHistoryItems = document.querySelectorAll(".search-history li");
let currentDate = dayjs().format("YYYY-MM-DD");
console.log(currentDate);
let date = new Date(currentDate);
var daysToAdd = 1;
date.setDate(date.getDate() + daysToAdd);
const forecastContainer = document.querySelector(".forecast-container ul");

var selectedCityInput = document.querySelector("#selected-city");

var ofWeekElements = document.getElementsByClassName("of-week");
for (var i = 0; i < ofWeekElements.length; i++) {
  var dayOfWeek = new Date();
  dayOfWeek.setDate(date.getDate() + i);
  ofWeekElements[i].innerHTML = dayjs().add(i, "day").format("dddd");
}

const day1 = document.getElementById("day1");
if (day1) {
  day1.innerHTML = "Today";
}
console.log(date);
console.log(dayOfWeek);

var searchBtn = document.getElementById("searchBtn");
var cityName = document.getElementById("selected-city");
const forecast5 = document.getElementById("forecast-container");

searchBtn.addEventListener(`click`, function (event) {
  event.preventDefault();
  var city = cityName.value;
  localStorage.setItem("selectedCity", city);
  getLatAndLon(city);
  saveSearchHistory(city);
});

function getLatAndLon(city) {
  var apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIKey}&units=imperial`;

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var lat = data[0].lat;
      var lon = data[0].lon;
      getWeatherData(lat, lon);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function getWeatherData(lat, lon) {
  var apiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`;

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      renderWeatherData(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function renderWeatherData(data) {
  for (var i = 0; i < 40; i += 8) {
    displayWeatherData(data.list[(i, i)]);
    console.log(data.list[(i, i)]);
  }
}

var nextFiveDays = [
  document.getElementById("day1"),
  document.getElementById("day2"),
  document.getElementById("day3"),
  document.getElementById("day4"),
  document.getElementById("day5"),
];

const newArray = [].concat(nextFiveDays.slice(0, 5));
console.log(newArray);

function displayWeatherData(data) {
  var tempElement = document.querySelector("#temp");
  var windElement = document.querySelector("#wind");
  var humidityElement = document.querySelector("#humidity");

  if (tempElement) {
    tempElement.textContent = data.main.temp;
  }
  if (windElement) {
    windElement.textContent = data.wind.speed;
  }
  if (humidityElement) {
    humidityElement.textContent = data.main.humidity;
  }
}

function saveSearchHistory(city, weatherData) {
  var searchHistory = document.querySelector("#results");
  if (searchHistory) {
    var newLI = document.createElement("li");
    newLI.textContent = city;
    searchHistory.appendChild(newLI);

    if (searchHistory.children.length > 5) {
      searchHistory.removeChild(searchHistory.firstElementChild);
    }

    newLI.addEventListener(`click`, function () {
      var savedWeatherData = localStorage.getItem(city);
      if (savedWeatherData) {
        renderWeatherData(JSON.parse(savedWeatherData));
      } else {
        fetchWeatherData(city);
      }
    });

    localStorage.setItem(city, JSON.stringify(weatherData));
  }
}

function fetchWeatherData(city) {
  saveSearchHistory(city, fetchedData);
}

var selectedCityInput = document.querySelector("#selected-city");
var ciudadElement = document.querySelector(".ciudad");

selectedCityInput.addEventListener("change", function () {
  setTimeout(function () {
    ciudadElement.textContent = selectedCityInput.value;
  }, 50);
});

// The above section was created with help from my tutor Jaun Santiago

var city = localStorage.getItem("city");
if (city) {
  var searchHistory = document.querySelector(".search-history");
  if (searchHistory) {
    var newLI = document.createElement("li");
    if (searchHistory.children.length >= 3) {
      searchHistory.removeChild(searchHistory.firstElementChild);
    }
    newLI.textContent = city;
    searchHistory.appendChild(newLI);
  }
}

window.onload = function () {
  var currentDate = dayjs().format("dddd DD MMMM YYYY");
  var currentDayEl = document.getElementById("current-date");
  if (currentDayEl) {
    currentDayEl.innerHTML = currentDate;
  } else {
    console.log('Element with id "current-date" not found');
  }
};

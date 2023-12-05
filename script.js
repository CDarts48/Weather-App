const APIKey = "98cf718268619abb852c630a60f05a1e";
var searchHistoryItems = document.querySelectorAll(".search-history li");
var currentDate = dayjs().format("YYYY-MM-DD");

console.log(currentDate);
var date = new Date();
var daysToAdd = 1;
date.setDate(date.getDate() + daysToAdd);
const nextFiveDays = [];

var ofWeekElements = document.getElementsByClassName("of-Week");
for (var i = 1; i < ofWeekElements.length; i++) {
  var currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  dayOfWeek[i].innerHTML = currentDate();
}
console.log(date);
console.log(ofWeekElements);
// console.log(ofWeekElements[0]);

var searchBtn = document.getElementById("searchBtn");
var cityName = document.getElementById("selected-city");
const forecast5 = document.getElementById("forecast-container");

searchBtn.addEventListener(`click`, function (event) {
  event.preventDefault();
  var city = cityName.value;
  getLatAndLon(city);
  saveSearchHistory(city);
});

function getLatAndLon(city) {
  var apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIKey}`;

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
  var apiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;

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
    var selectedObject = data[i];
    console.log(data);
    localStorage.setItem("selectedCity", cityName.value);
  }
}

function saveSearchHistory(city) {
  var searchHistory = document.querySelector(".search-history");
  if (searchHistory) {
    if (searchHistory.children.length >= 5) {
      searchHistory.removeChild(searchHistory.firstElementChild);
    }
    var newLI = document.createElement("li");
    newLI.textContent = city;
    searchHistory.appendChild(newLI);
    newLI.addEventListener(`click`, function (event) {
      event.preventDefault();
      var city = newLI.textContent;
      getLatAndLon(city);
    });
  }
}
// The above section was created with help from my tutor Jaun Santiago

var city = localStorage.getItem("city");
if (city) {
  var searchHistory = document.querySelector(".search-history");
  if (searchHistory) {
    var newLI = document.createElement("li");
    newLI.textContent = city;
    searchHistory.appendChild(newLI);

    var searchHistoryItems = document.querySelectorAll(".search-history li");
    if (searchHistoryItems.length > 5) {
      searchHistory.removeChild(
        searchHistoryItems[searchHistoryItems.length - 1]
      );
    }

    window.onload = function () {
      var currentDate = dayjs().format("dddd DD MMMM YYYY");
      var currentDayEl = document.getElementById("current-date");
      currentDayEl.innerHTML = currentDate;
    };
  }
}

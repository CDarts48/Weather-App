const APIKey = "98cf718268619abb852c630a60f05a1e";
var searchHistoryItems = document.querySelectorAll(".search-history li");
const currentDate = dayjs().format("YYYY-MM-DD");
console.log(currentDate);

var searchBtn = document.getElementById("searchBtn");
var cityName = document.getElementById("selected-city");
const forecast5 = document.getElementById("forcast-container");

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
  console.log(data);
}

function saveSearchHistory(city) {
  var searchHistory = document.querySelector(".search-history");
  if (searchHistory) {
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

window.onload = function () {
  var currentDate = dayjs().format("dddd DD MMMM YYYY");
  var currentDayEl = document.getElementById("current-date");
  currentDayEl.innerHTML = currentDate;

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
    }
  }
};

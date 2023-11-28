const APIKey = "98cf718268619abb852c630a60f05a1e";
var searchHistoryItems = document.querySelectorAll(".search-history li");
const currentDate = dayjs().format("YYYY-MM-DD");
console.log(currentDate);

var searchBtn = document.getElementById("searchBtn");
var cityName = document.getElementById("selected-city");
const forecast5 = document.getElementById("forcast-container");

searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var city = cityName.value;
  var apiurl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIKey}`;

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
  var ciudadElement = document.querySelector(".ciudad");
  ciudadElement.textContent = city;

  console.log(city);
  console.log(apiurl);
});

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

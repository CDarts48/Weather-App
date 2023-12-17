const APIKey = "98cf718268619abb852c630a60f05a1e";

let currentDate = dayjs().format("YYYY-MM-DD");
console.log(currentDate);
let date = new Date(currentDate);
var daysToAdd = 1;
date.setDate(date.getDate() + daysToAdd);

var selectedCityInput = document.querySelector("#selected-city");


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

getLatAndLon = (city) => {
  var apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIKey}&units=imperial`;

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var lat = data[0].lat;
      var lon = data[0].lon;
      getWeatherData(lat, lon);
    });
};
getWeatherData = (lat, lon) => {
  var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`;

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      localStorage.setItem("weatherData", JSON.stringify(data));

      renderWeatherData(data);
          });
};

var weatherDataArray = [];

renderWeatherData = (data) => {
  weatherDataArray = [];
  nextFiveDays.forEach(function (domElement) {
    domElement.innerHTML = "";
  });
console.log(data)
  for (var i = 0; i < 40; i += 8) {
    var dayData = data.list[i];
    weatherDataArray.push({
      domElement: nextFiveDays[i / 8],
      // day: ofWeekElements
      icon: dayData.weather[0].icon,
      temp: dayData.main.temp,
      humidity: dayData.main.humidity,
      wind: dayData.wind.speed,
    });
    displayWeatherData(dayData, i / 8);
  }
  console.log(weatherDataArray);
  JSON.stringify(weatherDataArray);

var ofWeekElements = document.getElementsByClassName("of-week");
for (var i = 0; i < ofWeekElements.length; i++) {
  var dayOfWeek = new Date();
  dayOfWeek.setDate(date.getDate() + i);
  ofWeekElements[i].innerHTML = dayjs().add(i, "day").format("dddd");
}

  weatherDataArray.forEach(function (weatherData) {
    weatherData.domElement.innerHTML += `
    <img src="http://openweathermap.org/img/w/${weatherData.icon}.png" alt="Weather icon">
    <p>Temperature: ${weatherData.temp}</p>
    <p>Humidity: ${weatherData.humidity}</p>
    <p>Wind Speed: ${weatherData.wind}</p>
  `;
  });
};

var nextFiveDays = [
  document.getElementById("day1"),
  document.getElementById("day2"),
  document.getElementById("day3"),
  document.getElementById("day4"),
  document.getElementById("day5"),
];

function clearFiveDayForecast() {
  nextFiveDays.forEach(function (dayElement) {
    dayElement.innerHTML = "";
  });
}

// Above is for the nextFiveDays not the currentWeather

displayWeatherData = (data) => {
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
};
// Above is for the currentWeather not the nextFiveDays

let cities = [];
for (let i = 0; i < 5; i++) {
  let cityName = "City " + (i + 1);
  let weatherData = getWeatherData(cityName);
  let city = {
    name: cityName,
    weatherData: weatherData,
  };

  cities.push(city);
}
let citiesJSON = JSON.stringify(cities);
localStorage.setItem("cities", citiesJSON);

var saveSearchHistory = (city, weatherData) => {
  var searchHistory = document.querySelector("#results");
  if (searchHistory) {
    var newLI = document.createElement("li");
    newLI.textContent = city;
    searchHistory.appendChild(newLI);

    if (searchHistory.children.length > 5) {
      searchHistory.removeChild(searchHistory.firstElementChild);
    }
    var savedCities = JSON.parse(localStorage.getItem("cities")) || [];
    savedCities.push({ city: city, weatherData: weatherData });

    if (savedCities.length > 5) {
      savedCities.splice(0, savedCities.length - 5);
    }

    localStorage.setItem("cities", JSON.stringify(savedCities));

    newLI.addEventListener("click", function () {
      newLI.addEventListener("click", function () {
        // Clear the search bar
        document.getElementById("selected-city").value = "";

        // Display the clicked city in the 'ciudad' class
        document.querySelector(".ciudad").textContent = this.textContent;

        var savedWeatherData = localStorage.getItem(city);
        if (savedWeatherData) {
          var parsedData = JSON.parse(savedWeatherData);
          displayCurrentWeather(parsedData);
        } else {
          // Fetch the weather data if it doesn't exist in local storage
          getLatAndLon(city);
        }
      });
      document.querySelector(".ciudad").textContent = this.city;
      var savedWeatherData = localStorage.getItem(city);
      if (savedWeatherData) {
        var parsedData = JSON.parse(savedWeatherData);
        renderWeatherData(parsedData);
      } else {
        getLatAndLon(city);
      }
    });
  }
};

var fetchWeatherData = (city) => {
  saveSearchHistory(city, fetchedData);
};

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

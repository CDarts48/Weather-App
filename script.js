const APIKey = "98cf718268619abb852c630a60f05a1e";

var searchBtn = document.getElementById("searchBtn");
var cityName = document.querySelector("h1");
var forcast5 = document.getElementById("forcast");

searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var city = document.getElementById("selected-city").value;
  console.log(city);
});

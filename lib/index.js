var locationBtn = document.getElementById("weather-btn");
var locationInput = document.getElementById("location");

locationBtn.addEventListener("click", function(){
  var weatherRequest = new XMLHttpRequest();
  weatherRequest.open('Get', 'https://sweater-weather-567.herokuapp.com/api/v1/forecast?location=' + locationInput.value);
  weatherRequest.onload = function() {
    var weatherData = JSON.parse(weatherRequest.responseText);
    createHtmlElemets(weatherData);
  };
  weatherRequest.send();

})


function createHtmlElemets(data) {
  currentElement(data, "city", "info");

  for(var i=0; i < 7; i++) {
    hourlyElement(data.hourly[i], "hourly-forecast");
    dailyElement(data.daily[i], "daily-forecast");
  }
}

function currentElement(data, targetOne, targetTwo) {
  createETag(data.city, targetOne);
  createETag(data.country, targetOne);
  createETag(data.currently.time, targetTwo);
  createETag(data.currently.preciporcentage, targetTwo);
  createETag(data.currently.summary, targetTwo);
  createETag(data.currently.temp, targetTwo);
}

function hourlyElement(data, target) {
  createETag(data.preciporcentage, target);
  createETag(data.summary, target);
  createETag(data.temp, target);
  createETag(data.time, target);

}

function dailyElement(data, target) {
  createETag(data.preciporcentage, target);
  createETag(data.summary, target);
  createETag(data.maxtemp, target);
  createETag(data.mintemp, target);
  createETag(data.time, target);
}

function createETag(text, target) {
  var element = document.createElement('div');
  var nodeText = document.createTextNode(`${text}`);
  element.appendChild(nodeText);
  var parent = document.getElementById(target).appendChild(element);
}

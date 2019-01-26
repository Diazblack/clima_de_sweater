var locationBtn = document.getElementById("weather-btn");
var locationInput = document.getElementById("location");
var logIn = document.getElementById("login");
var logSubmit = document.getElementById("login-submit");

locationBtn.addEventListener("click", function(){
  var weatherRequest = new XMLHttpRequest();
  weatherRequest.open('Get', 'https://sweater-weather-567.herokuapp.com/api/v1/forecast?location=' + locationInput.value);
  weatherRequest.onload = function() {
    var weatherData = JSON.parse(weatherRequest.responseText);
    createHtmlElemets(weatherData);
  };
  weatherRequest.send();

})

logIn.addEventListener("click", function () {
  $('.login-form').removeClass("hidden");
})

logSubmit.addEventListener("click", function (){
  event.preventDefault();
  var userData = { email: $('#email').val(), password: $('#password').val() }


  fetch('https://sweater-weather-567.herokuapp.com/api/v1/sessions', {
    method: "POST",
    mode: "cors",
    headers: { 'Accept': 'application/json',  'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })
  .then(response => response.json())
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Success:', JSON.stringify(response)));
})
// Helper funtions

function createHtmlElemets(data) {
  currentElement(data);

  for(var i=0; i < 7; i++) {
    hourlyElement(data.hourly[i]);
    dailyElement(data.daily[i]);
  }
}

function currentElement(data) {
  var text = `<ul class="card"><li>${data.city}</li><li>Country: ${data.country}</li><li>${data.currently.time}</li><li>Precipation: ${data.currently.preciporcentage} %</li></ul>`
  $('.summary').append(`<ul class="card", id="current-temp"><li>${data.currently.summary}</li><li>Temperature:${data.currently.temp}</li></ul>`);
  $('.city-info').append(text);
}

function hourlyElement(data) {
  var text = `<ul class="card"><li>${data.time}</li><li>${data.summary}</li><li>Temperature: ${data.temp}</li><li>Precipation: ${data.preciporcentage} %</li></ul>`
  $('.hourly-forecast').append(text);
}

function dailyElement(data) {
  var text = `<ul class="card"><li>${data.time}</li><li>${data.summary}</li><li>Maximum Temp: ${data.maxtemp}</li><li>MinimumTemp: ${data.mintemp}</li><li>Precipation: ${data.preciporcentage} %</li></ul>`
  $('.daily-forecast').append(text);
}


// function displayFrom() {
//
// }

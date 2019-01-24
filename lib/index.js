var locationBtn = document.getElementById("weather-btn");
var locationInput = document.getElementById("location");

locationBtn.addEventListener("click", function(){
  var weatherRequest = new XMLHttpRequest();
  weatherRequest.open('Get', 'https://sweater-weather-567.herokuapp.com/api/v1/forecast?location=' + locationInput.value);
  weatherRequest.onload = function() {
    var weatherData = JSON.parse(weatherRequest.responseText);
    console.log(weatherData);
  };
  weatherRequest.send();

})

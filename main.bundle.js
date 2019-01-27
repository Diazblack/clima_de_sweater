/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	"use strict";

	var locationBtn = document.getElementById("weather-btn");
	var locationInput = document.getElementById("location");
	var logIn = document.getElementById("login");
	var logSubmit = document.getElementById("login-submit");

	locationBtn.addEventListener("click", function () {
	  var weatherRequest = new XMLHttpRequest();
	  weatherRequest.open('Get', 'https://sweater-weather-567.herokuapp.com/api/v1/forecast?location=' + locationInput.value);
	  weatherRequest.onload = function () {
	    var weatherData = JSON.parse(weatherRequest.responseText);
	    createHtmlElemets(weatherData);
	  };
	  weatherRequest.send();
	});

	logIn.addEventListener("click", function () {
	  $('.login-form').removeClass("hidden");
	});

	logSubmit.addEventListener("click", function () {
	  event.preventDefault();
	  var userData = { email: $('#email').val(), password: $('#password').val() };
	  fetch('https://sweater-weather-567.herokuapp.com/api/v1/sessions', {
	    method: "POST",
	    mode: "cors",
	    redirect: 'follow',
	    headers: {
	      'Accept': 'application/json', 'Content-Type': 'application/json' },
	    body: JSON.stringify(userData)
	  }).then(function (response) {
	    return response.json();
	  }).then(function (data) {
	    var response = data.data.attributes;
	    sessionStorage.setItem("userKey", response.api_key);
	    alert(userData.email + ", Has Succesfully Log In ");
	    logIn.disabled = true;
	    $('.login-form').addClass("hidden");
	  }).catch(function (error) {
	    return loginError();
	  });
	}, { once: true });

	// Helper funtions

	function loginError() {
	  alert("Login Failed. Please enter a valid user email and password.");
	}

	function createHtmlElemets(data) {
	  currentElement(data);

	  for (var i = 0; i < 7; i++) {
	    hourlyElement(data.hourly[i]);
	    dailyElement(data.daily[i]);
	  }
	}

	function currentElement(data) {
	  var text = "<ul class=\"card\"><li>" + data.city + "</li><li>Country: " + data.country + "</li><li>" + data.currently.time + "</li><li>Precipation: " + data.currently.preciporcentage + " %</li></ul>";
	  $('.summary').append("<ul class=\"card\", id=\"current-temp\"><li>" + data.currently.summary + "</li><li>Temperature:" + data.currently.temp + "</li></ul>");
	  $('.city-info').append(text);
	}

	function hourlyElement(data) {
	  var text = "<ul class=\"card\"><li>" + data.time + "</li><li>" + data.summary + "</li><li>Temperature: " + data.temp + "</li><li>Precipation: " + data.preciporcentage + " %</li></ul>";
	  $('.hourly-forecast').append(text);
	}

	function dailyElement(data) {
	  var text = "<ul class=\"card\"><li>" + data.time + "</li><li>" + data.summary + "</li><li>Maximum Temp: " + data.maxtemp + "</li><li>MinimumTemp: " + data.mintemp + "</li><li>Precipation: " + data.preciporcentage + " %</li></ul>";
	  $('.daily-forecast').append(text);
	}

	// function displayFrom() {
	//
	// }

/***/ })
/******/ ]);
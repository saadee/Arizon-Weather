// MODULE
var weatherApp = angular.module("weatherApp", ["ngRoute", "ngResource"]);

// Routes
weatherApp.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "pages/home.html",
      controller: "homeController",
    })
    .when("/forecast", {
      templateUrl: "pages/forecast.html",
      controller: "forecastController",
    });
});

// SERVICES
weatherApp.service("cityService", function () {
  this.city = "London,UK";
});

// Controller
weatherApp.controller("homeController", [
  "$scope",
  "cityService",
  function ($scope, cityService) {
    $scope.city = cityService.city;
    $scope.$watch("city", function () {
      cityService.city = $scope.city;
      // console.log($scope.city )
    });
  },
]);
weatherApp.controller("forecastController", [
  "$scope",
  "cityService",
  "$http",
  function ($scope, cityService, $http) {
    $scope.city = cityService.city;
    // $scope.data = {};
    $http({
      method: "GET",
      url:
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        $scope.city +
        "&appid=b019840a48d4dd66ea6bc57baed3d9d8",
    }).then(function successCallback(response) {
      $scope.temp = (response.data.main.temp - 273.15).toFixed(2);
      $scope.weather = response.data.weather[0].main;

      console.log(response);
      // console.log(response.data.weather[0].main);
      $scope.data = response;
    });
  },
]);

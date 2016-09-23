'use strict';

angular.module('testApp', ['ui.router'])
.config(function($urlRouterProvider, $locationProvider) {
  $urlRouterProvider
    .otherwise('/');

  $locationProvider.html5Mode(true);
});;

'use strict';

angular.module('testApp', ['ui.router', 'ui.bootstrap'])
.config(function($urlRouterProvider, $locationProvider) {
  $urlRouterProvider
    .otherwise('/');

  $locationProvider.html5Mode(true);
})
.run(function ($rootScope, $location, $state) {
  // Redirect to login if route requires auth and you're not logged in
  $rootScope.$on('$stateChangeStart', function (event, next) {
    if (['signin', 'signup'].indexOf(next.name) === -1 && !$rootScope.token) {
      return $location.path('/signin');
    }
  });
});

'use strict';

angular.module('testApp')
.config(function($stateProvider, $httpProvider) {
  //pass access token to every request
  $httpProvider.interceptors.push('authInterceptor');

  $stateProvider
  .state('main', {
    url: '/',
    templateUrl: 'app/main/main.html',
    controller: 'mainCtrl'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'app/auth/signup.html',
    controller: 'SignupCtrl'
  })
  .state('signin', {
    url: '/signin',
    templateUrl: 'app/auth/signin.html',
    controller: 'SigninCtrl'
  });
})
.factory('authInterceptor', function ($rootScope, $location, $q) {
  return {
    // Add authorization token to headers
    request: function (config) {
      config.headers = config.headers || {};
      if ($rootScope.token) {
        config.headers.Authorization = 'Bearer ' + $rootScope.token;
      }
      return config;
    },
    // Intercept 401s and redirect you to login
    responseError: function (response) {
      if (response.status === 401) {
        $location.path('/signin');
        // remove any stale tokens
        $rootScope.token = null;
        return $q.reject(response);
      } else {
        return $q.reject(response);
      }
    }
  };
});
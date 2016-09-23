'use strict';

angular.module('testApp')
.config(function($stateProvider) {
  $stateProvider
  .state('signup', {
    url: '/signup',
    templateUrl: 'app/auth/signup.html',
    controller: 'SignupCtrl'
  });
});
'use strict';

angular.module('testApp').controller('SigninCtrl', function($rootScope, $scope, $state, $http) {
  $scope.data = {};
  $scope.errors = {};
  $scope.submitted = false;

  $scope.login = function(form) {
    $scope.submitted = true;

    if (form.$valid) {
      $http.post('/api/auth/local', {
        email: $scope.data.email,
        password: $scope.data.password
      })
      .then(function(resp) {
        //remember this token to $rootscope
        //This is temp function, should store in the cookies...
        $rootScope.token = resp.data.token;
        // Logged in, redirect to home
        $state.go('main');
      }, function(err) {
        $scope.errors.other = err.data.message;
      });
    }
  };
});
'use strict';

angular.module('testApp').controller('SignupCtrl', function($scope, $state, $http) {
  $scope.data = {};
  $scope.errors = {};
  $scope.submitted = false;

  $scope.register = function(form) {
    $scope.submitted = true;

    if (form.$valid) {
      $http.post('/api/users', $scope.data)
      .then(function() {
        $state.go('signin');
      }, function(err) {
        $scope.errors = {};
        angular.forEach(err.errors, (error, field) => {
          form[field].$setValidity('mongoose', false);
          this.errors[field] = error.message;
        });
      });
    }
  }
});
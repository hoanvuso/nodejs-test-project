'use strict';

angular.module('testApp').controller('CreateRecordCtrl', function($scope, $http, $uibModalInstance) {
  $scope.record = {};
  $scope.submit = function () {
    $http.post('/api/records', $scope.record)
    .then(function(resp) {
      $uibModalInstance.close(resp.data);
    });
  };
});
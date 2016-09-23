'use strict';

angular.module('testApp').controller('UpdateRecordCtrl', function($scope, $http, $uibModalInstance, record) {
  $scope.record = record;
  $scope.submit = function () {
    $http.put('/api/records/' + $scope.record._id, $scope.record)
    .then(function(resp) {
      $uibModalInstance.close(resp.data);
    });
  };
});
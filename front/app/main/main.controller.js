'use strict';

angular.module('testApp').controller('MainCtrl', function($scope, $uibModal, $http) {
  $scope.records = [];

  $scope.createRecord = function () {
    var modalInstance = $uibModal.open({
      templateUrl: 'app/main/record-form-modal.html',
      controller: 'CreateRecordCtrl'
    });

    modalInstance.result.then(function (newItem) {
      $scope.records.push(newItem);
    });
  };
});
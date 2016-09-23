'use strict';

angular.module('testApp').controller('MainCtrl', function($scope, $uibModal, $http) {
  $scope.records = [];

  $http.get('/api/records')
  .then(function(resp) {
    $scope.records = resp.data;
  });

  $scope.createRecord = function () {
    var modalInstance = $uibModal.open({
      templateUrl: 'app/main/record-form-modal.html',
      controller: 'CreateRecordCtrl'
    });

    modalInstance.result.then(function (newItem) {
      $scope.records.push(newItem);
    });
  };

  $scope.updateRecord = function (record) {
    var modalInstance = $uibModal.open({
      templateUrl: 'app/main/record-form-modal.html',
      controller: 'UpdateRecordCtrl',
      resolve: {
        record: function() {
          var item = angular.copy(record);
          if (item.date) {
            item.date = new Date(item.date);
          }
          return item;
        }
      }
    });

    modalInstance.result.then(function (item) {
      record = Object.assign(record, item);
    });
  };
});
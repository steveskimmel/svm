angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {

  $scope.test =
  {
    first : 3240
  }
})

.controller('ChatsCtrl', function($scope) {
  $scope.rangeModel =
  {
    percDeals : 0,
    percDealsSize : 0,
    percAverageWinRate : 0,
    percAverageSalesCycle : 0
  }

  $scope.test =
  {
    first : 124
  }
})

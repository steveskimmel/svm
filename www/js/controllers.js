angular.module('starter.controllers', [])



.controller('DashCtrl', function($state, $scope, $http, $rootScope) {

    $scope.calcSales =
    {
      deals: null,
      dealsSize: null,
      averageWinRate: null,
      averageSalesCycle: null,
      value: null
    }

      $scope.calculate = function() {
            $http({
                  method:"POST",
                  url:"https://digitalforce-sales-model.herokuapp.com/",
                  headers: {
                      "cache-control": "no-cache",
                      "content-type": "application/json"
                  },
                  data: {
                    'calc_sales':
                    {
                      'deals': $scope.calcSales.deals,
                      'deal_size': $scope.calcSales.dealsSize,
                      'win_rate': $scope.calcSales.averageWinRate,
                      'avg_sales_cycle': $scope.calcSales.averageSalesCycle
                   }
                 },
              }).then(function successCallback(response) {
                  console.log(response.data);
                  $scope.calcSales.value = response.data;
                  $rootScope.salesValue = $scope.calcSales.value;
                  console.log("rootscope: "+$rootScope.salesValue)
                }, function errorCallback(response) {
                  console.log(response);
                });
              }
    })

.controller('ChatsCtrl', function($state, $scope, $http, $rootScope) {
    $state.reload();

  console.log("this is in new controller: "+$rootScope.salesValue)

  $scope.rangeModel =
  {
    percDeals : 0,
    percDealsSize : 0,
    percAverageWinRate : 0,
    percAverageSalesCycle : 0,
    currentSales: $rootScope.salesValue,
    targetSales: null,
    percUplift: 0
  }

  //change method one

  $scope.targetValChange = function() {

    //  $scope.rangeModel.percUplift = (($scope.rangeModel.targetSales - $scope.rangeModel.currentSales)/ $scope.rangeModel.currentSales)*100;
    //  console.log("per value uplift: "+$scope.rangeModel.percUplift)

      $scope.percentageVariableIncrease();

        $http({
              method:"POST",
              url:"https://digitalforce-sales-model.herokuapp.com/",
              headers: {
                  "cache-control": "no-cache",
                  "content-type": "application/json"
              },
              data: {
                'sales_perc_increase':
                {
                  'new_sales': $scope.rangeModel.targetSales
               }
             },
          }).then(function successCallback(response) {
              console.log(response);
              console.log("percentage uplift is: "+response.data+" now we call percentage var increase method");
              $scope.rangeModel.percUplift = response.data;
              $scope.percentageVariableIncrease();
            }, function errorCallback(response) {
              console.log(response);
            });
      }

          $scope.percentageVariableIncrease = function() {
                $http({
                      method:"POST",
                      url:"https://digitalforce-sales-model.herokuapp.com/",
                      headers: {
                          "cache-control": "no-cache",
                          "content-type": "application/json"
                      },
                      data: {
                        'variables_perc_increase':
                        {
                          'percentage_increase': $scope.rangeModel.percUplift
                       }
                     },
                  }).then(function successCallback(response) {
                      console.log(response.data);
                      $scope.rangeModel.percUplift = response.data;
                      $scope.rangeValueSet();

                    }, function errorCallback(response) {
                      console.log(response);
                });
            }

            $scope.rangeValueSet = function() {
              $scope.rangeModel.percDeals = $scope.rangeModel.percUplift;
              $scope.rangeModel.percDealsSize = $scope.rangeModel.percUplift;
              $scope.rangeModel.percAverageWinRate = $scope.rangeModel.percUplift;
              $scope.rangeModel.percAverageSalesCycle = $scope.rangeModel.percUplift;

            }

            $scope.rangeModelChange = function() {
                  $http({
                        method:"POST",
                        url:"https://digitalforce-sales-model.herokuapp.com/",
                        headers: {
                            "cache-control": "no-cache",
                            "content-type": "application/json"
                        },
                        data: {
                          'increased_sales_value':
                          {
                            'percentage_increase_deals': parseInt($scope.rangeModel.percDeals),
                            'percentage_increase_deal_size':parseInt($scope.rangeModel.percDealsSize),
                            'percentage_increase_win_rate':parseInt($scope.rangeModel.percAverageWinRate),
                            'percentage_increase_avg_sales_cycle':parseInt($scope.rangeModel.percAverageSalesCycle)
                         }
                       },
                    }).then(function successCallback(response) {
                        console.log("new target sales value: "+response.data);
                        $scope.rangeModel.targetSales = response.data;
                      }, function errorCallback(response) {
                        console.log(response);
                  });
              }


// $scope.salesValue = $rootScope.salesValue;
})

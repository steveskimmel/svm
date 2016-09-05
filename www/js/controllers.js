angular.module('starter.controllers', [])



.controller('DashCtrl', function($state, $scope, $http, $rootScope, ionicToast) {

    $scope.calcSales =
    {
      deals: null,
      dealsSize: null,
      averageWinRate: null,
      averageSalesCycle: null,
      value: null,
      hideValue: false,
      haveCalc: false
    }

    $scope.showToast = function(){
    <!-- ionicToast.show(message, position, stick, time); -->
      ionicToast.show('API ERROR.', 'top', true, 2500);
    };

      $scope.calculate = function() {
        $scope.calcSales.hideValue = true;
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
                if(response.status === 500 || response.status === 404)
                {
                  //$scope.showToast();
                }
                $scope.calcSales.hideValue = false;
                  console.log(response.data);
                  $scope.calcSales.value = response.data;
                  $scope.calcSales.haveCalc = true;
                  $rootScope.salesValue = $scope.calcSales.value;
                  console.log("rootscope: "+$rootScope.salesValue)
                }, function errorCallback(response) {
                  console.log(response.data);
                  if(response.status === 500 || response.status === 404)
                  {
                    $scope.calcSales.hideValue = false;
                    //$scope.showToast();
                    $scope.calcSales.deals = "";
                    $scope.calcSales.dealsSize = "";
                    $scope.calcSales.averageWinRate = "";
                    $scope.calcSales.averageSalesCycle = "";

                  }
                });
              }
    })

.controller('AboutCtrl', function($state, $scope, $http, $rootScope, ionicToast) {
        $state.reload();
})

///////////////////////////////////////////////////////////////////////////////////////////

.controller('ChatsCtrl', function($state, $scope, $http, $rootScope, ionicToast) {
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
    percUplift: 0,
    varUplift: null,
    hideValue: false
  }

  $scope.showToast = function(){
  <!-- ionicToast.show(message, position, stick, time); -->
    ionicToast.show('API ERROR!', 'top', true, 2500);
  };

  //change method one

  $scope.targetValChange = function() {

    $scope.rangeModel.hideValue = true;

    //  $scope.rangeModel.percUplift = (($scope.rangeModel.targetSales - $scope.rangeModel.currentSales)/ $scope.rangeModel.currentSales)*100;
    //  console.log("per value uplift: "+$scope.rangeModel.percUplift)

      //$scope.percentageVariableIncrease();

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
            //console.log(response.status);
            if(response.status === 500 || response.status === 404)
            {
            //  $scope.showToast();
            }
            else {
              $scope.rangeModel.hideValue = false;
                //console.log(response);
                console.log("percentage uplift is: "+response.data+" now we call percentage var increase method");
                $scope.rangeModel.percUplift = response.data;
                $scope.percentageVariableIncrease();
             }
            }, function errorCallback(response) {
              if(response.status === 500 || response.status === 404)
              {
                //$scope.showToast();
                $scope.rangeModel.hideValue = false;

              }
              //console.log(response.status);
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
                      $scope.rangeModel.varUplift = response.data;
                      $scope.rangeValueSet();

                    }, function errorCallback(response) {
                      console.log(response);
                });
            }

            $scope.rangeValueSet = function() {
              $scope.rangeModel.percDeals = $scope.rangeModel.varUplift;
              $scope.rangeModel.percDealsSize = $scope.rangeModel.varUplift;
              $scope.rangeModel.percAverageWinRate = $scope.rangeModel.varUplift;
              $scope.rangeModel.percAverageSalesCycle = $scope.rangeModel.varUplift;

            }

            //
            $scope.percUpliftAfterSliderChange = function() {

              $scope.rangeModel.hideValue = true;

              //  $scope.rangeModel.percUplift = (($scope.rangeModel.targetSales - $scope.rangeModel.currentSales)/ $scope.rangeModel.currentSales)*100;
              //  console.log("per value uplift: "+$scope.rangeModel.percUplift)

                //$scope.percentageVariableIncrease();

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
                      //console.log(response.status);
                      if(response.status === 500 || response.status === 404)
                      {
                      //  $scope.showToast();
                      }
                      else {
                        $scope.rangeModel.hideValue = false;
                          //console.log(response);
                          console.log("percentage uplift is: "+response.data+" now we call percentage var increase method");
                          $scope.rangeModel.percUplift = response.data;
                          //$scope.percentageVariableIncrease();
                       }
                      }, function errorCallback(response) {
                        if(response.status === 500 || response.status === 404)
                        {
                          //$scope.showToast();
                          $scope.rangeModel.hideValue = false;

                        }
                        //console.log(response.status);
                      });


            }
            //

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

                      //
                        $scope.rangeModel.targetSales = response.data;
                        $scope.percUpliftAfterSliderChange();
                      }, function errorCallback(response) {
                        console.log(response);
                  });
              }
})

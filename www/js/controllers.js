angular.module('starter.controllers', [])



.controller('DashCtrl', function($state, $scope, $http, $rootScope, ionicToast) {

    $scope.calcSales =
    {
      deals: null,
      dealsSize: null,
      averageWinRate: null,
      averageSalesCycle: null,
      dec_value: null,
      hideValue: false,
      haveCalc: false
    }

    $scope.reset = function(){
      $scope.calcSales.deals = null;
      $scope.calcSales.dealsSize = null;
      $scope.calcSales.averageWinRate = null;
      $scope.calcSales.averageSalesCycle = null;
    }


    $scope.showToast = function(){
    <!-- ionicToast.show(message, position, stick, time); -->
      ionicToast.show('API ERROR.', 'top', true, 2500);
    };

      $scope.calculate = function() {

        $rootScope.current_deals = $scope.calcSales.deals;
        $rootScope.current_deal_size = $scope.calcSales.dealsSize;
        $rootScope.current_win_rate = $scope.calcSales.averageWinRate;
        $rootScope.current_avg_sales_cycle = $scope.calcSales.averageSalesCycle;

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
                  $scope.calcSales.dec_value = parseFloat(response.data);
                  console.log($scope.calcSales.dec_value);
                  $scope.calcSales.haveCalc = true;
                  $rootScope.currentDecValue = $scope.calcSales.dec_value
                }, function errorCallback(response) {
                  console.log(response.data);
                  if(response.status === 500 || response.status === 404)
                  {
                    $scope.calcSales.hideValue = false;
                    //$scope.showToast();
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
    percDealsDec : 0,
    percDealsSizeDec : 0,
    percAverageWinRateDec : 0,
    percAverageSalesCycleDec : 0,
    decSales: $rootScope.currentDecValue,
    current_deals:$rootScope.current_deals,
    current_deal_size:  $rootScope.current_deal_size,
    current_win_rate: $rootScope.current_win_rate,
    current_avg_sales_cycle: $rootScope.current_avg_sales_cycle,
    targetSales: null,
    targetSalesDec: null,
    percUpliftDec: 0,
    varUpliftDec: null,
    hideValue: false,
    fontColorDeals: "color: #f8f8f8;",
    fontColorDealSize: "color: #f8f8f8;",
    fontColorWinRate: "color: #f8f8f8;",
    fontColorSalesCycle: "color: #f8f8f8;"
  }

  $scope.showToast = function(){
  <!-- ionicToast.show(message, position, stick, time); -->
    ionicToast.show('API ERROR!', 'top', true, 2500);
  };

  //change method one

  $scope.targetValChange = function() {
    console.log($scope.rangeModel.decSales)

    $scope.rangeModel.hideValue = true;
    $scope.rangeModel.targetSalesDec = $scope.rangeModel.targetSales;
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
                  'new_sales': $scope.rangeModel.targetSales,
                  'current_sales': $scope.rangeModel.decSales
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
                $scope.rangeModel.percUpliftDec = parseFloat(response.data);
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
                          'percentage_increase': $scope.rangeModel.percUpliftDec
                       }
                     },
                  }).then(function successCallback(response) {
                      console.log(response.data);
                      $scope.rangeModel.varUpliftDec = parseFloat(response.data);
                      $scope.rangeValueSet();

                    }, function errorCallback(response) {
                      console.log(response);
                });
            }

            $scope.rangeValueSet = function() {

              $scope.rangeModel.percDealsDec = $scope.rangeModel.varUpliftDec;
              $scope.rangeModel.percDealsSizeDec = $scope.rangeModel.varUpliftDec;
              $scope.rangeModel.percAverageWinRateDec = $scope.rangeModel.varUpliftDec;
              $scope.rangeModel.percAverageSalesCycleDec = $scope.rangeModel.varUpliftDec;

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
                            'new_sales': $scope.rangeModel.targetSalesDec,
                            'current_sales': $scope.rangeModel.decSales
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
                          $scope.rangeModel.percUpliftDec = parseFloat(response.data);
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

              console.log("% Deals : " + $scope.rangeModel.percDealsDec);
              console.log("Deal Size : " + $scope.rangeModel.percDealsSizeDec);
              console.log("% Win Rate : " + $scope.rangeModel.percAverageWinRateDec);
              console.log("Sales Cycle : " + $scope.rangeModel.percAverageSalesCycleDec);

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
                            'percentage_increase_deals': parseFloat($scope.rangeModel.percDealsDec),
                            'percentage_increase_deal_size':parseFloat($scope.rangeModel.percDealsSizeDec),
                            'percentage_increase_win_rate':parseFloat($scope.rangeModel.percAverageWinRateDec),
                            'percentage_increase_avg_sales_cycle':parseFloat($scope.rangeModel.percAverageSalesCycleDec),
                            'current_deals': parseInt($scope.rangeModel.current_deals),
                            'current_deal_size': parseInt($scope.rangeModel.current_deal_size),
                            'current_win_rate': parseInt($scope.rangeModel.current_win_rate),
                            'current_avg_sales_cycle': parseInt($scope.rangeModel.current_avg_sales_cycle)
                         }
                       },
                    }).then(function successCallback(response) {
                        console.log("new target sales value: "+response.data);

                      //
                        $scope.rangeModel.targetSalesDec = parseFloat(response.data);
                        $scope.percUpliftAfterSliderChange();
                      }, function errorCallback(response) {
                        console.log(response);
                  });
              }


              $scope.foresterFunction = function() {
                if($scope.rangeModel.percDealsDec >= 0 && $scope.rangeModel.percDealsDec <= 5){
                  console.log("forester");
                  $scope.rangeModel.fontColorDeals = "color: #86BC40;"
                }
                else{
                  $scope.rangeModel.fontColorDeals = "color: #f8f8f8;"
                }

                if($scope.rangeModel.percDealsSizeDec >= 10 && $scope.rangeModel.percDealsSizeDec <= 20){
                  $scope.rangeModel.fontColorDealSize = "color: #86BC40;"
                }
                else{
                  $scope.rangeModel.fontColorDealSize = "color: #f8f8f8;"
                }

                if($scope.rangeModel.percAverageWinRateDec >= 8 && $scope.rangeModel.percAverageWinRateDec <= 10){
                  $scope.rangeModel.fontColorWinRate = "color: #86BC40;"
                }
                else{
                  $scope.rangeModel.fontColorWinRate = "color: #f8f8f8;"
                }

                if($scope.rangeModel.percAverageSalesCycleDec >= 12 && $scope.rangeModel.percAverageSalesCycleDec <= 20){
                  $scope.rangeModel.fontColorSalesCycle = "color: #86BC40;"
                }
                else{
                  $scope.rangeModel.fontColorSalesCycle = "color: #f8f8f8;"
                }
              }
})

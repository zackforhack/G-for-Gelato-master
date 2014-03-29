'use strict';

angular.module('appApp')
  .controller('OrdersCtrl', function ($scope, $firebase) {
  	var orders = new Firebase('https://menuapp.firebaseio.com/Orders');
  	//$scope.orders = $firebase(orders);
  	orders.on('value', function(snapshot) {
      $scope.orders = snapshot.val();
    });
    
    (function(){
      $scope.ordersArray = [];
      for(var order in $scope.orders){
         $scope.ordersArray.unshift($scope.orders[order]);
      }
    })();

    // $scope.ordersreal = $firebase(orders);
    // console.log($scope.ordersreal);

  });

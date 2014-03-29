'use strict';

angular.module('appApp')
  .controller('MainCtrl', function ($scope, $firebase, $http, $location) {
    var menu = new Firebase('https://menuapp.firebaseio.com/MenuItems');
    var categories = new Firebase('https://menuapp.firebaseio.com/Category');

    menu.on('value', function(snapshot) {
      $scope.menuItems = snapshot.val();
    });

    (function(){
      $scope.menuItemsArray = [];
      for(var item in $scope.menuItems){
         $scope.menuItemsArray.push($scope.menuItems[item]);
      }
    })();

    categories.on('value', function(dataSnapshot) {
        $scope.categories = dataSnapshot.val();
      });

    $scope.resetMenuItem = function(){
      $scope.menuItem = {
        'title': undefined,
        'description': undefined,
        'category': undefined,
        'picture': undefined,
        'price': undefined
      };
    };
    $scope.resetMenuItem();

    $scope.addItem = function(){
        $scope.menuItems.$add($scope.menuItem);
        var inCategoryList = false;
        for (var index in $scope.categories) {
          if ($scope.menuItem.category === $scope.categories[index].name) {
            inCategoryList = true;
          }
        }
        if (!inCategoryList) {
          categories.push({'name': $scope.menuItem.category});
        }
        $scope.resetMenuItem();
      };

    $scope.deleteItem = function(key){
        $scope.menuItems.$remove(key);
      };

    $scope.addCategory = function(){
        categories.push({'name': $scope.categoryName, 'img': $scope.categoryImg});

        delete $scope.categoryName;
        delete $scope.categoryDesciption;
      };

    $scope.deleteCateg = function(key){
        categories.child(key).remove();
      };

  });


  var app = angular.module('app',[]);

  app.controller('main', function($scope, $http){
    console.log("App Start");

    $scope.phone = '';

    $scope.get = function (v) {
          console.log(v);
    };
  })

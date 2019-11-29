var app = angular.module('myApp', []);

angular.module("app", ["ngRoute", "dndLists"])
    .config(function($routeProvider) {
      $routeProvider
          .when('/nested', {
            templateUrl: 'nested/nested.html',
            controller: 'NestedListsDemoController'
          })
          .otherwise({redirectTo: '/nested'});
    });


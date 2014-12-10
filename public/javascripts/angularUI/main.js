'use strict';

var fbSeating = new Firebase('https://hrr-kitchen.firebaseio.com/seating');

/* App Module */

var kitchenApp = angular.module('kitchenApp', [
  'ui.bootstrap',
  'ngRoute',
  'appControllers',
  'kitchenApp.services'
  ],

  function($interpolateProvider) {
    $interpolateProvider.startSymbol('{%');
    $interpolateProvider.endSymbol('%}');
  }
);

kitchenApp.config(['$routeProvider', "$httpProvider",
  function($routeProvider, $httpProvider) {
    $routeProvider.
      when('/index', {
        templateUrl: './partials/kitchenView.html',
        controller: 'kitchenCtrl'
      }).
      otherwise({
        redirectTo: '/index'
      });

      $httpProvider.interceptors.push('AttachTokens');
  }]);

kitchenApp.factory('AttachTokens', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.hrr-kitchen');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      console.log(object)
      return object;

    }
  };
  return attach;
})

kitchenApp.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.withCredentials = true;
}])

// kitchenApp.config(['$httpProvider', function($httpProvider) {
//         $httpProvider.defaults.useXDomain = true;
//         delete $httpProvider.defaults.headers.common['X-Requested-With'];
//     }
// ]);

// kitchenApp.config(['$httpProvider', function($httpProvider) {
//         $httpProvider.defaults.useXDomain = true;
//         delete $httpProvider.defaults.headers.common['X-Requested-With'];
//     }
// ]);






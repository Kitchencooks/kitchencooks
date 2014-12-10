var appControllers = angular.module('appControllers');

appControllers.controller('AuthController', ["$scope", "$window", "$location", "Auth", function ($scope, $window, $location, Auth) {
  $scope.user = {};

  $scope.logout = function() {
    Auth.logout();
  };

  $scope.loggedIn = function() {
    return Auth.isAuth();
  };

  $scope.login = function () {
    Auth.login()
      .then(function (user) {
        console.log(user)
        // $window.localStorage.setItem('com.sr-flashcards', token);
        $location.path('/');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

}]);

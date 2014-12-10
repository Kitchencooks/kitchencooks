angular.module('kitchenApp.services', [])

.factory('Auth', function ($http, $location, $window, $rootScope) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.shortly'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var login = function () {
    console.log("in login")
    return $http({
      method: 'GET',
      url: 'localhost:3000/auth/github'
    // xhrFields: {

    //    'withCredentials': true},


    //   headers:{
    //             'Access-Control-Allow-Origin': '*',
    //             'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    //             'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
    //             'X-Random-Shit':'123123123'
    //         }
    })
    .then(function (resp) {
      console.log(resp.data)
      $window.localStorage.setItem('com.hrr-kitchen', 'fix me');

      return resp.data
      // $window.localStorage.setItem('com.sr-flashcards.user_id', resp.data.user_id);
      // return resp.data.token;
    });
  };

  var logout = function () {
    return $http({
      method: 'GET',
      url: '/logout'
    })
    .then(function (resp) {
      $window.localStorage.removeItem('com.hrr-kitchen');
      return resp.data;
      // $window.localStorage.setItem('com.sr-flashcards.user_id', resp.data.user_id);
      // return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.sr-flashcards');
  };


  return {
    login: login,
    logout: logout,
    isAuth: isAuth
  };
});

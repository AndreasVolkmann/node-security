angular.module('app').factory('ApiFactory', ['$http', '$rootScope', function ($http, $rootScope) {
    var factory = {};

    var url = 'http://localhost:3000/';

    factory.authenticate = function (user, callback) {
        $http.post(url + 'users/authenticate', user).then(function (response) {
            callback(null, response.data);
        }, function (err) {
            console.log(err);
        });
    };

    factory.signup = function (user, callback) {
        $http.post(url + 'users/signup', user).then(function (response) {
            callback(null, response.data);
        }, function (err) {
            callback(err);
        });
    };

    factory.getNames = function (callback) {
        console.log($rootScope.token);
        var req = {
            method : 'GET',
            url    : url + 'api/names',
            headers: {
                'Authorization': $rootScope.token
            }
        };
        $http(req).then(function (response) {
            callback(response.data);
        });
    };

    factory.getHellos = function (callback) {
        var req = {
            method : 'GET',
            url    : url + 'api/hellos',
            headers: {
                'Authorization': $rootScope.token
            }
        };
        $http(req).then(function (response) {
            callback(response.data);
        })
    };


    return factory;
}]);
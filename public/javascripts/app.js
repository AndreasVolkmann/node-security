var app = angular.module('app', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/names', {
            templateUrl: 'views/names.html',
            controller : 'Names as ctrl'
        })
        .when('/hellos', {
            templateUrl: 'views/hellos.html',
            controller : 'Hellos as ctrl'
        })
        .when('/signup', {
            templateUrl: 'views/signup.html',
            controller : 'Sign as ctrl'
        })
        .otherwise({
            redirectTo: '/home'
        })
}]);


app.controller('Main', ['ApiFactory', '$rootScope', function (ApiFactory, $rootScope) {

    var self = this;

    self.userName = '';
    self.password = '';
    self.loggedIn = false;
    self.token = '';

    self.myDataRef = new Firebase('https://resplendent-fire-8955.firebaseio.com/');

    self.fire = function () {
        self.myDataRef.set({name: self.userName, text: self.password});
    };

    self.authenticate = function () {
        ApiFactory.authenticate({userName: self.userName, password: self.password}, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
                self.loggedIn = true;
                self.token = data.token;
                $rootScope.token = data.token;
            }
        });
    };

}]);

app.controller('Names', ['ApiFactory', function (ApiFactory) {
    var self = this;

    self.names = [];

    ApiFactory.getNames(function (data) {
        self.names = data;
    })


}]);
app.controller('Hellos', ['ApiFactory', function (ApiFactory) {
    var self = this;

    self.hellos = [];

    ApiFactory.getHellos(function (data) {
        self.hellos = data;
    })
}]);

app.controller('Sign', ['ApiFactory', function (ApiFactory) {
    var self = this;

    self.userName = '';
    self.password = '';

    self.signup = function () {
        ApiFactory.signup({userName: self.userName, password: self.password}, function (err, data) {
            if (err) {
                console.error(err);
            } else {
                console.log(data);
            }
        })
    }
}]);
var app = angular
    .module('app', ['ngRoute', 'ngCookies'])
    .config(function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'templates/home.html',
                controller: 'HomeController'
            })
            .when('/login', {
                templateUrl: 'templates/login.html',
                controller: 'LoginController'
            })
            .otherwise({redirectTo: '/'});

        //$locationProvider.html5Mode(true);
    });
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
            .when('/register', {
                templateUrl: 'templates/register.html',
                controller: 'RegisterController'
            })
            .when('/user/home', {
                templateUrl: 'templates/home.html',
                controller: 'HomeController'
            })
            .when('/user/ads/publish', {
                templateUrl: 'templates/user/publish-ad.html',
                controller: 'PublishAdController'
            })
            .otherwise({redirectTo: '/'});

        //$locationProvider.html5Mode(true);
    });
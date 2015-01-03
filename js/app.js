var app = angular
    .module('app', ['ngRoute', 'angularFileUpload', 'fundoo.services'])
    .config(function($routeProvider){
        var isNotLogged = function($location, $window){
            if ($window.sessionStorage["userInfo"]) {
                $location.path('/user/home');
            }
        };

        var isLogged = function($location, $window){
            if (!$window.sessionStorage["userInfo"]) {
                $location.path('/');
            }
        };

        $routeProvider
            .when('/', {
                templateUrl: 'templates/home.html',
                controller: 'HomeController',
                resolve: { isLogged: isNotLogged }
            })
            .when('/login', {
                templateUrl: 'templates/login.html',
                controller: 'LoginController',
                resolve: { isLogged: isNotLogged }
            })
            .when('/register', {
                templateUrl: 'templates/register.html',
                controller: 'RegisterController',
                resolve: { isLogged: isNotLogged }
            })
            .when('/user/home', {
                templateUrl: 'templates/home.html',
                controller: 'HomeController',
                resolve: { isLogged: isLogged }
            })
            .when('/user/ads/publish', {
                templateUrl: 'templates/user/publish-ad.html',
                controller: 'PublishAdController',
                resolve: { isLogged: isLogged }
            })
            .when('/user/ads', {
                templateUrl: 'templates/user/user-ads.html',
                controller: 'UserAdsController',
                resolve: { isLogged: isLogged }
            })
            .when('/user/ads/edit/:id', {
                templateUrl: 'templates/user/edit-ad.html',
                controller: 'EditAdController',
                resolve: { isLogged: isLogged }
            })
            .otherwise({redirectTo: '/'});

        //$locationProvider.html5Mode(true);
    });
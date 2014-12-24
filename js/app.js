var app = angular
    .module('app', ['ngRoute'])
    .config(function($routeProvider, $locationProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'templates/home.html',
                controller: 'HomeController'
            })
            .otherwise({redirectTo: '/'});

        $locationProvider.html5Mode(true);
    });
var app = angular
    .module('app', ['ngRoute'])
    .config(function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'templates/hello.html',
                controller: 'HomeController'
            })
            .otherwise({redirectTo: '/'});
    });
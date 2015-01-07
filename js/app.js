var app = angular
    .module('app', ['ngRoute', 'angularFileUpload', 'fundoo.services'])
    .config(function($routeProvider){
        var isNotLogged = function($location, $window){
            if ($window.sessionStorage["userInfo"]) {
                if (JSON.parse($window.sessionStorage['userInfo']).isAdmin){
                    $location.path('/admin/ads');
                }
                else {
                    $location.path('/user/home');
                }
            }
        };

        var isLogged = function($location, $window){
            if (!$window.sessionStorage["userInfo"]) {
                $location.path('/');
            }
        };

        var isAdmin = function($location, $window){
            if (!$window.sessionStorage["userInfo"]){
                $location.path('/');
            }
            else if (!JSON.parse($window.sessionStorage['userInfo']).isAdmin){
                $location.path('/user/home');
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
            .when('/user/profile', {
                templateUrl: 'templates/user/edit-user-profile.html',
                controller: 'EditUserProfileController',
                resolve: { isLogged: isLogged }
            })
            .when('/admin/home', {
                templateUrl: 'templates/home.html',
                controller: 'HomeController',
                resolve: { isLogged: isAdmin }
            })
            .when('/admin/ads', {
                templateUrl: 'templates/admin/admin-home.html',
                controller: 'AdminHomeController',
                resolve: { isLogged: isAdmin }
            })
            .when('/admin/ads/edit/:id', {
                templateUrl: 'templates/admin/admin-edit-ad.html',
                controller: 'EditAdController',
                resolve: { isLogged: isAdmin }
            })
            .when('/admin/users', {
                templateUrl: 'templates/admin/admin-users-list.html',
                controller: 'AdminUsersController',
                resolve: { isLogged: isAdmin }
            })
            .otherwise({redirectTo: '/'});

        //$locationProvider.html5Mode(true);
    });
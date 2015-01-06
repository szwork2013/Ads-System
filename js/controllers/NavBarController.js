app.controller('NavBarController', function($scope, $rootScope, $location, $window, authFactory){

    $scope.logout = function(user){
        authFactory.logoutUser(user)
            .then(function(data){
                $rootScope.user = undefined;
                $rootScope.successMessage = 'Successful logout!';
                $location.path('#/');
            });
    };
});
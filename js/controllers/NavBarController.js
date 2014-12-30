app.controller('NavBarController', function($scope, $rootScope, $location, authRequester){
    $scope.logout = function(user){
        authRequester.logoutUser(user.token)
            .then(function(data){
                $rootScope.user = undefined;
                $rootScope.successMessage = 'Successful logout!';
                $location.path('#/');
            });
    }
});
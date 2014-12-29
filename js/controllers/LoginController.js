app.controller('LoginController', function($scope, $rootScope, $location, authRequester){
    $scope.login = function(){
        authRequester.loginUser($scope.user.username, $scope.user.password)
            .then(function(data){
                $rootScope.accessToken = data.access_token;
                $location.path('#/');
            }, function(error){
                $scope.loginError = error.error_description;
            })
    }
});
app.controller('LoginController', function($scope, $location, authRequester){
    $scope.login = function(){
        authRequester.loginUser($scope.user.username, $scope.user.password)
            .then(function(data){
                $scope.accessToken = data.access_token;
            }, function(error){
                $scope.loginError = error.error_description;
            })
    }
});
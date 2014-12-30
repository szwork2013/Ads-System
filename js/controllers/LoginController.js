app.controller('LoginController', function($scope, $rootScope, $location, authRequester){
    $scope.login = function(){
        authRequester.loginUser($scope.user.username, $scope.user.password)
            .then(function(userInfo){
                $rootScope.user = userInfo;
                $rootScope.successMessage = 'Successful login!';
                $location.path('/user/home');
            }, function(error){
                $scope.loginError = error.error_description;
            })
    };
});
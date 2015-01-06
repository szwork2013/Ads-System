app.controller('LoginController', function($scope, $rootScope, $location, authFactory){
    $scope.login = function(){
        authFactory.loginUser($scope.user.username, $scope.user.password)
            .then(function(userInfo){
                $rootScope.user = userInfo;
                $rootScope.successMessage = 'Successful login!';
                if (userInfo.isAdmin){
                    $location.path('/admin/home');
                }
                else {
                    $location.path('/user/home');
                }
            }, function(error){
                $scope.loginError = error.error_description;
            })
    };
});
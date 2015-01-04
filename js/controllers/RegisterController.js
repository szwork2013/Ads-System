app.controller('RegisterController', function($scope, $rootScope, dataFactory, $location, authFactory){
    dataFactory.getTowns()
        .then(function(data){
            $scope.towns = data;
        });

    $scope.registerUser = function(user){
        dataFactory.registerUser(user)
            .then(function(data){
                authRequester.loginAfterRegistration(data);
                $rootScope.successMessage = 'Successful registration and login!';
                $location.path('/user/home');
            }, function(error){
                $scope.registerError = error.modelState[''];
            });
    }
});
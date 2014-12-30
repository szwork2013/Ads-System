app.controller('RegisterController', function($scope, dataRequester, $location, authRequester){
    dataRequester.getTowns()
        .then(function(data){
            $scope.towns = data;
        });

    $scope.registerUser = function(user){
        authRequester.registerUser(user)
            .then(function(data){
                authRequester.loginAfterRegistration(data);
                $location.path('/user/home');
            }, function(error){
                $scope.registerError = error.modelState[''];
            });
    }
});
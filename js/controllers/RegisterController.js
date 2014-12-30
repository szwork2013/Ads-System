app.controller('RegisterController', function($scope, dataRequester){
    dataRequester.getTowns()
        .then(function(data){
            $scope.towns = data;
        });

    $scope.registerUser = function(user){
        console.log(user);
    }
});
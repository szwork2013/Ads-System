app.controller('EditUserProfileController', function($scope, $window, dataFactory, authFactory){
    var userInfo = JSON.parse($window.sessionStorage['userInfo']);

    dataFactory.getTowns()
        .then(function(data){
            $scope.towns = data;
        });

    authFactory.getUser(userInfo)
        .then(function(data){
            $scope.user = data;
            console.log(data);
        }, function(error){
            console.log(error);
        });

    $scope.editUser = function(user){
        console.log(user);
    };

    $scope.changePassword = function(password){
        console.log(password);
    }
});
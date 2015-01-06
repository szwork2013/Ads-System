app.controller('EditUserProfileController', function($scope, $window, dataFactory, authFactory){
    var userInfo = JSON.parse($window.sessionStorage['userInfo']);

    dataFactory.getTowns()
        .then(function(data){
            $scope.towns = data;
        });

    authFactory.getUser(userInfo)
        .then(function(data){
            $scope.user = data;
        }, function(error){
            console.log(error);
        });

    $scope.editUser = function(data){
        authFactory.editUser(userInfo, data)
            .then(function(data){
                $scope.successMessage = data.message;
            }, function(error){
                $scope.editProfileError = error.modelState;
            })
    };

    $scope.changePassword = function(password){
        authFactory.changePassword(userInfo, password)
            .then(function(data){
                $scope.successMessage = data.message;
            }, function(error){
                $scope.editProfileError = error.modelState;
            })

    };

    $scope.closeMessage = function(){
        $scope.successMessage = undefined;
    };
});
app.controller('EditUserProfileController', function(
    $scope,
    $rootScope,
    $location,
    dataFactory,
    authFactory) {

    var userInfo = authFactory.getUserInfo();

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
                $rootScope.successMessage = data.message;
                $location.path('/user/home');
            }, function(error){
                $scope.editProfileError = error.modelState;
            })
    };

    $scope.changePassword = function(password){
        authFactory.changePassword(userInfo, password)
            .then(function(data){
                $rootScope.successMessage = data.message;
                $location.path('/user/home');
            }, function(error){
                $scope.editProfilePasswordError = error.modelState;
            })

    };
});
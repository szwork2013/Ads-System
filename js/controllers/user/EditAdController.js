app.controller('EditAdController', function(
    $scope,
    $rootScope,
    $routeParams,
    $window,
    $location,
    userFactory,
    dataFactory){
    var userInfo = JSON.parse($window.sessionStorage['userInfo']);

    dataFactory.getCategories()
        .then(function(data){
            $scope.categories = data;
        });

    dataFactory.getTowns()
        .then(function(data){
            $scope.towns = data;
        });

    userFactory.getAdBuId(userInfo, $routeParams.id)
        .then(function(data){
            $scope.ad = data;
            console.log(data);
        }, function(error){
            console.log(error);
        });

    $scope.asdfg = function(ad){
        userFactory.editAd(userInfo, ad)
            .then(function(data){
                $rootScope.successMessage = data.message;
                $location.path('/user/ads');
            }, function(error){
                $scope.editAdError = error.modelState;
            })
    }
});
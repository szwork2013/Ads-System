app.controller('EditAdController', function(
    $scope,
    $rootScope,
    $routeParams,
    $timeout,
    $location,
    userFactory,
    authFactory,
    dataFactory){

    var userInfo = authFactory.getUserInfo();

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
        }, function(error){
            console.log(error);
        });

    $scope.editAdBtn = function(ad){
        if (ad.image){
            ad.imageDataUrl = $scope.image;
        }

        userFactory.editAd(userInfo, ad)
            .then(function(data){
                if (userInfo.isAdmin){
                    $rootScope.successMessage = data.message;
                    $location.path('/admin/ads');
                }
                else {
                    $rootScope.successMessage = data.message + ' Don\'t forget to submit it for publishing.';
                    $location.path('/user/ads');
                }
            }, function(error){
                $scope.editAdError = error.modelState;
            })
    };

    $scope.generateThumb = function(ad){
        var image = ad.image[0];
        ad.changeImage = true;
        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent)
        {
            $timeout(function(){
                $scope.image = fileLoadedEvent.target.result;
                ad.imageDataUrl = $scope.image;
            });
        };

        fileReader.readAsDataURL(image);
    };

    $scope.deleteAdImage = function(ad){
        ad.changeImage = true;
        ad.imageDataUrl = null;
        $scope.image = null;
    }
});
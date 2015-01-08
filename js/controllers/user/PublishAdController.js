app.controller('PublishAdController', function(
    $scope,
    $rootScope,
    $timeout,
    $location,
    dataFactory,
    userFactory,
    authFactory)
{
    var userInfo = authFactory.getUserInfo();

    dataFactory.getCategories()
        .then(function(data){
            $scope.categories = data;
        });

    dataFactory.getTowns()
        .then(function(data){
            $scope.towns = data;
        });

    $scope.submitNewAd = function(newAd){
        if (newAd.image){
            newAd.imageDataUrl = $scope.image;
        }

        userFactory.publishNewAd(newAd, userInfo)
            .then(function(data){
                $rootScope.successMessage = data.message + ' Once approved, it will be published.';
                $location.path('/user/ads');
            }, function(errer){
                $scope.publishNewAdError = errer.modelState;
            });
    };

    $scope.generateThumb = function(image){
        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent)
        {
            $timeout(function(){
                $scope.image = fileLoadedEvent.target.result;
            });
        };
        fileReader.readAsDataURL(image);
    }
});
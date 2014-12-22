app.controller('HomeController', function($scope, adsData){
    $scope.name = "SPA";

    adsData.getAds()
        .then(function(data) {
            $scope.allAds = data;
        })
});
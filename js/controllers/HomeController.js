app.controller('HomeController', function($scope, adsData){
    $scope.name = "SPA";

    adsData.getAds()
        .then(function(data) {
            $scope.allAds = data;
        });

    adsData.getCategories()
        .then(function(data){
            $scope.categories = data;
        });

    adsData.getTowns()
        .then(function(data){
        $scope.towns = data;
    })
});
app.controller('HomeController', function($scope, dataRequester){
    dataRequester.getAds()
        .then(function(data) {
            $scope.allAds = data;
        });

    dataRequester.getCategories()
        .then(function(data){
            $scope.categories = data;
        });

    dataRequester.getTowns()
        .then(function(data){
        $scope.towns = data;
        });

    $scope.urlParams = [];
    $scope.getCategoryId = function(id){
        $scope.urlParams['categoryIdParam'] = 'categoryid=' + id;
        urlParser();
    };

    $scope.getTownId = function(id){
        $scope.urlParams['townIdParam'] = 'townid=' + id;
        urlParser();
    };

    $scope.getAllCategories = function(){
        delete $scope.urlParams['categoryIdParam'];
        urlParser();
    };

    $scope.getAllTowns = function(){
        delete $scope.urlParams['townIdParam'];
        urlParser();
    };

    function urlParser(){
        dataRequester.getAds($scope.urlParams)
            .then(function(data) {
                $scope.allAds = data;
            });
    }
});
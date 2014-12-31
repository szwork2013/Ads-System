app.controller('HomeController', function($scope, $rootScope, dataFactory, authFactory){
    dataFactory.getAds()
        .then(function(data) {
            $scope.allAds = data;
        });

    dataFactory.getCategories()
        .then(function(data){
            $scope.categories = data;
        });

    dataFactory.getTowns()
        .then(function(data){
        $scope.towns = data;
        });

    $scope.urlParams = [];
    $scope.getCategoryId = function(id){
        $scope.urlParams['categoryIdParam'] = 'categoryid=' + id;
        delete $scope.urlParams['currentPage'];
        urlParser();
    };

    $scope.getTownId = function(id){
        $scope.urlParams['townIdParam'] = 'townid=' + id;
        delete $scope.urlParams['currentPage'];
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
        dataFactory.getAds($scope.urlParams)
            .then(function(data) {
                $scope.allAds = data;
            });
    }

    $scope.getNumber = function(number){
        return new Array(number);
    };

    $scope.showPage = function(num){
        $scope.urlParams['currentPage'] = 'startpage=' + num;
        urlParser();
    };

    $scope.closeMessage = function(){
        $rootScope.successMessage = undefined;
    };
});
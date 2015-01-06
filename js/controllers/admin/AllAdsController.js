app.controller('AllAdsController', function($scope, $window, adminAdsFactory, dataFactory){
    var userInfo = JSON.parse($window.sessionStorage['userInfo']);

    dataFactory.getCategories()
        .then(function(data){
            $scope.categories = data;
        });

    dataFactory.getTowns()
        .then(function(data){
            $scope.towns = data;
        });

    $scope.urlParams = [];

    $scope.showPage = function(text, page){
        $scope.urlParams['currentPage'] = 'startpage=' + page;
        urlParser();
    };

    function urlParser(){
        adminAdsFactory.getAds(userInfo, $scope.urlParams)
            .then(function(data){
                $scope.allAds = data;
                console.log(data);
            }, function(error){
                console.log(error);
            });
    }

    urlParser();
});
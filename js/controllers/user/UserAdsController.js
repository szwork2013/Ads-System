app.controller('UserAdsController', function($scope, $window, userFactory){
    var userInfo = JSON.parse($window.sessionStorage['userInfo']);
    console.log(userInfo);

    userFactory.getUserAds(userInfo)
        .then(function(data){
            $scope.userAds = data;
        }, function(error){
            console.log(error);
        });

    $scope.adStatusButtons = function(ad){
        var result;
        switch (ad.status) {
            case 'WaitingApproval':
            case 'Published':
                result = true;
                break;
            case 'Inactive':
                result = false;
                break;
        }

        return result;
    };

    $scope.getNumber = function(number){
        return new Array(number);
    };

    $scope.urlParams = [];

    $scope.getPageNumber = function(page){
        $scope.urlParams['currentPage'] = 'startpage=' + page;
        urlParser();
    };

    $scope.getAdByStatus = function(status){
        $scope.urlParams['status'] = 'status=' + status;
        delete $scope.urlParams['currentPage'];
        urlParser();
    };

    function urlParser(){
        userFactory.getUserAds(userInfo, $scope.urlParams)
            .then(function(data){
                $scope.userAds = data;
            }, function(error){
                console.log(error);
            });
    }
});
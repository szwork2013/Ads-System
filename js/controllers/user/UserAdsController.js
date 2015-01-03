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

    $scope.showPage = function(page){
        userFactory.getUserAds(userInfo, page)
            .then(function(data){
                $scope.userAds = data;
            }, function(error){
                console.log(error);
            });
    }
});
app.controller('AdminTownsController', function($scope, authFactory, adminTownsFactory){
    var userInfo = authFactory.getUserInfo();

    $scope.urlParams = [];

    function urlParser(){
        adminTownsFactory.getTowns(userInfo, $scope.urlParams)
            .then(function(data){
                $scope.data = data;
            }, function(error){
                console.log(error);
            });
    }

    urlParser();

    $scope.showPage = function(text, page){
        $scope.urlParams['currentPage'] = 'startpage=' + page;
        urlParser();
    };
});
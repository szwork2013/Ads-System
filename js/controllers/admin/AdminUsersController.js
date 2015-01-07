app.controller('AdminUsersController', function($scope, $window, adminUsersFactory){
    var userInfo = JSON.parse($window.sessionStorage['userInfo']);

    $scope.urlParams = [];

    $scope.showPage = function(text, page){
        $scope.urlParams['currentPage'] = 'startpage=' + page;
        urlParser();
    };

    function urlParser(){
        adminUsersFactory.getUsers(userInfo, $scope.urlParams)
            .then(function(data){
                console.log(data);
                $scope.data = data;
            }, function(error){
                console.log(error);
            });
    }

    urlParser();
});
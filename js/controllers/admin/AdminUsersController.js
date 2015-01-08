app.controller('AdminUsersController', function(
    $scope,
    $rootScope,
    $window,
    $location,
    dataFactory,
    authFactory,
    adminUsersFactory){

    var userInfo = authFactory.getUserInfo();
    if ($window.sessionStorage['userToEdit']) {
        $scope.userToEdit = JSON.parse($window.sessionStorage['userToEdit']);
    }

    dataFactory.getTowns()
        .then(function(data){
            $scope.towns = data;
        });

    $scope.showEditUserPage = function(user){
        $window.sessionStorage['userToEdit'] = JSON.stringify(user);
        $location.path('/admin/users/edit/' + user.username);
    };

    $scope.editUser = function(userEdited){
        adminUsersFactory.editUser(userInfo, userEdited)
            .then(function(data){
                $rootScope.successMessage = data.message;
                $location.path('/admin/users/');
            }, function(error){
                console.log(error);
            });
    };

    $scope.changeUserPassword = function(pass, userToEdit){
        adminUsersFactory.changeUserPassword(userInfo, pass, userToEdit)
            .then(function(data){
                $rootScope.successMessage = data.message;
                $location.path('/admin/users/');
            }, function(error){
                console.log(error);
            });
    };

    $scope.urlParams = [];

    $scope.showPage = function(text, page){
        $scope.urlParams['currentPage'] = 'startpage=' + page;
        urlParser();
    };

    function urlParser(){
        adminUsersFactory.getUsers(userInfo, $scope.urlParams)
            .then(function(data){
                $scope.data = data;
            }, function(error){
                console.log(error);
            });
    }

    $scope.closeMessage = function(){
        $rootScope.successMessage = undefined;
    };

    urlParser();
});
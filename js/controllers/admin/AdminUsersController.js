app.controller('AdminUsersController', function(
    $scope,
    $rootScope,
    $window,
    $location,
    dataFactory,
    authFactory,
    adminUsersFactory,
    createDialog){

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

    function deleteUser(user){
        adminUsersFactory.deleteUser(userInfo, user)
            .then(function(data){
                $rootScope.successMessage = data.message;
                $location.path('/admin/users/');
            }, function(error){
                console.log(error);
            });
    }

    $scope.showDeleteUserConfirmation = function(user){
        createDialog('../../templates/delete-user-confirmation-new.html',{
            id : 'simpleDialog',
            title: 'Confirm deletion',
            backdrop: true,
            success: {
                label: 'DELETE',fn: function(){
                    deleteUser(user);
                }
            }
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
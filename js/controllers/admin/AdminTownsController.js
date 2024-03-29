app.controller('AdminTownsController', function(
    $scope,
    $rootScope,
    $window,
    $location,
    authFactory,
    adminTownsFactory,
    createDialog){

    var userInfo = authFactory.getUserInfo();
    if ($window.sessionStorage['townToEdit']) {
        $scope.townToEdit = JSON.parse($window.sessionStorage['townToEdit']);
    }

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

    $scope.showEditTownPage = function(town){
        $window.sessionStorage['townToEdit'] = JSON.stringify(town);
        $location.path('/admin/town/edit/' + town.id);
    };

    $scope.editTownBtn = function(town){
        adminTownsFactory.editTown(userInfo, town)
            .then(function(data){
                $rootScope.successMessage = data.message;
                $location.path('/admin/towns/');
            }, function(error){
                $scope.editTownError = error.modelState;
            });
    };

    $scope.createTownBtn = function(town){
        adminTownsFactory.createTown(userInfo, town)
            .then(function(data){
                $rootScope.successMessage = data.message;
                $location.path('/admin/towns/');
            }, function(error){
                $scope.createTownError = error.modelState;
            });
    };

    function deleteTown(town){
        adminTownsFactory.deleteTown(userInfo, town)
            .then(function(data){
                $rootScope.successMessage = data.message;
                $location.path('/admin/towns/');
            }, function(error){
                console.log(error);
            });
    }

    $scope.showDeleteTownConfirmation = function(town){
        createDialog('../../templates/delete-town-confirmation.html',{
            id : 'simpleDialog',
            title: 'Confirm deletion',
            backdrop: true,
            success: {
                label: 'DELETE',fn: function(){
                    deleteTown(town);
                }
            }
        });
    };

    $scope.closeMessage = function(){
        $rootScope.successMessage = undefined;
    };
});
app.controller('AdminTownsController', function(
    $scope,
    $rootScope,
    $window,
    $location,
    authFactory,
    adminTownsFactory){

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
                $scope.createCategoryError = error.modelState;
            });
    };

    $scope.closeMessage = function(){
        $rootScope.successMessage = undefined;
    };
});
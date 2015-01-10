app.controller('AdminCategoriesController', function(
    $scope,
    $rootScope,
    $window,
    $location,
    authFactory,
    adminCategoriesFactory){

    var userInfo = authFactory.getUserInfo();
    if ($window.sessionStorage['categoryToEdit']) {
        $scope.categoryToEdit = JSON.parse($window.sessionStorage['categoryToEdit']);
    }

    $scope.urlParams = [];

    function urlParser(){
        adminCategoriesFactory.getCategories(userInfo, $scope.urlParams)
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

    $scope.closeMessage = function(){
        $rootScope.successMessage = undefined;
    };

    $scope.showEditCategoryPage = function(category){
        $window.sessionStorage['categoryToEdit'] = JSON.stringify(category);
        $location.path('/admin/category/edit/' + category.id);
    };

    $scope.editCategoryBtn = function(category){
        adminCategoriesFactory.editCategory(userInfo, category)
            .then(function(data){
                $rootScope.successMessage = data.message;
                $location.path('/admin/categories/');
            }, function(error){
                console.log(error);
            });
    };

    $scope.showCreateCategoryPage = function(){
        $location.path('/admin/category/create/');
    }
});
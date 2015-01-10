app.controller('AdminCategoriesController', function(
    $scope,
    $rootScope,
    $window,
    $location,
    authFactory,
    adminCategoriesFactory,
    createDialog){

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
                $scope.createCategoryError = error.modelState;
            });
    };

    $scope.createCategoryBtn = function(category){
        adminCategoriesFactory.createCategory(userInfo, category)
            .then(function(data){
                $rootScope.successMessage = data.message;
                $location.path('/admin/categories/');
            }, function(error){
                $scope.createCategoryError = error.modelState;
            });
    };

    function deleteCategory(category){
        adminCategoriesFactory.deleteCategory(userInfo, category)
            .then(function(data){
                $rootScope.successMessage = data.message;
                $location.path('/admin/categories/');
            }, function(error){
                console.log(error);
            });
    }

    $scope.showDeleteCategoryConfirmation = function(category){
        createDialog('../../templates/delete-category-confirmation.html',{
            id : 'simpleDialog',
            title: 'Confirm deletion',
            backdrop: true,
            success: {
                label: 'DELETE',fn: function(){
                    deleteCategory(category);
                }
            }
        });
    };

    $scope.closeMessage = function(){
        $rootScope.successMessage = undefined;
    };
});
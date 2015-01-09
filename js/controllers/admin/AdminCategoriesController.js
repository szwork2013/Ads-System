app.controller('AdminCategoriesController', function($scope, authFactory, adminCategoriesFactory){

    var userInfo = authFactory.getUserInfo();

    adminCategoriesFactory.getCategories(userInfo)
        .then(function(data){
            $scope.data = data;
        }, function(error){
            console.log(error);
        })
});
app.controller('PublishAdController', function($scope, dataRequester){
    dataRequester.getCategories()
        .then(function(data){
            $scope.categories = data;
        });

    dataRequester.getTowns()
        .then(function(data){
            $scope.towns = data;
        });
});
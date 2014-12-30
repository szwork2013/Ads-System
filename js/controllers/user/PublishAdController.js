app.controller('PublishAdController', function($scope, $timeout, dataRequester){
    dataRequester.getCategories()
        .then(function(data){
            $scope.categories = data;
        });

    dataRequester.getTowns()
        .then(function(data){
            $scope.towns = data;
        });

    $scope.submitNewAd = function(newAd){
        if (newAd.image){
            newAd.imageDataUrl = $scope.image;
        }
        console.log(newAd);
    };

    $scope.generateThumb = function(image){
        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent)
        {
            $timeout(function(){
                $scope.image = fileLoadedEvent.target.result;
            });
        };
        fileReader.readAsDataURL(image);
    }
});
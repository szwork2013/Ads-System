app.factory('adsData', function($http, $q){

    return {
        getAds: function(){
            var defer = $q.defer();

            $http({method: 'GET', url: 'http://softuni-ads.azurewebsites.net/api/ads'})
                .success(function(data, status, headers, config){
                    defer.resolve(data);
                })
                .error(function(data, status, headers, config){
                    defer.reject(data);
                });

            return defer.promise;
        }
    }
});
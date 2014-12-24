app.factory('adsData', function($http, $q){

    function getAds(){
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

    function getCategories(){
        var defer = $q.defer();

        $http({method: 'GET', url: 'http://softuni-ads.azurewebsites.net/api/categories'})
            .success(function(data, status, headers, config){
                defer.resolve(data);
            })
            .error(function(data, status, headers, config){
                defer.reject(data);
            });

        return defer.promise;
    }

    function getTowns(){
        var defer = $q.defer();

        $http({method: 'GET', url: 'http://softuni-ads.azurewebsites.net/api/towns'})
            .success(function(data, status, headers, config){
                defer.resolve(data);
            })
            .error(function(data, status, headers, config){
                defer.reject(data);
            });

        return defer.promise;
    }

    return {
        getAds: getAds,
        getCategories: getCategories,
        getTowns: getTowns
    }
});
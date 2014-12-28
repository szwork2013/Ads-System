app.factory('dataRequester', function($http, $q){

    function getAds(urlParams){
        var defer = $q.defer();

        var parameters = '?';

        for (var par in urlParams){
            parameters += urlParams[par] + '&';
        }

        $http({method: 'GET', url: 'http://softuni-ads.azurewebsites.net/api/ads' + parameters + '&pagesize=3'})
            .success(function (data, status, headers, config) {
                defer.resolve(data);
            })
            .error(function (data, status, headers, config) {
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
app.factory('dataRequester', function($http, $q){

    var API_URL = 'http://softuni-ads.azurewebsites.net/api';

    function getAds(urlParams){
        var defer = $q.defer();

        var parameters = '';

        for (var par in urlParams){
            parameters += '&' + urlParams[par];
        }

        $http.get(API_URL + '/ads?pagesize=3' + parameters)
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

        $http.get(API_URL + '/categories')
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

        $http.get(API_URL + '/towns')
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
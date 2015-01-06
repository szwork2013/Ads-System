app.factory('adminAdsFactory', function($http, $q){
    var API_URL = 'http://softuni-ads.azurewebsites.net/api/admin';

    function getAds(user, urlParams){
        var defer = $q.defer();

        var parameters = '';

        for (var par in urlParams){
            parameters += '&' + urlParams[par];
        }

        $http.get(API_URL + '/ads?pagesize=3' + parameters, {
            headers: {
                Authorization: 'Bearer ' + user.access_token
            }
        })
            .success(function (data, status, headers, config) {
                defer.resolve(data);
            })
            .error(function (data, status, headers, config) {
                defer.reject(data);
            });


        return defer.promise;
    }

    function approveAd(user, ad){
        var defer = $q.defer();

        $http.put(API_URL + '/ads/approve/' + ad.id, '', {
            headers: {
                Authorization: 'Bearer ' + user.access_token
            }
        })
            .success(function (data, status, headers, config) {
                defer.resolve(data);
            })
            .error(function (data, status, headers, config) {
                defer.reject(data);
            });

        return defer.promise;
    }

    function rejectAd(user, ad){
        var defer = $q.defer();

        $http.put(API_URL + '/ads/reject/' + ad.id, '', {
            headers: {
                Authorization: 'Bearer ' + user.access_token
            }
        })
            .success(function (data, status, headers, config) {
                defer.resolve(data);
            })
            .error(function (data, status, headers, config) {
                defer.reject(data);
            });

        return defer.promise;
    }

    return {
        getAds: getAds,
        approveAd: approveAd,
        rejectAd: rejectAd
    }
});
app.factory('userFactory', function($http, $q, $window){
    var API_URL = 'http://softuni-ads.azurewebsites.net/api/user';

    function publishNewAd(ad, user){
        var defer = $q.defer();

        $http.post(API_URL + '/ads',
            {
                title: ad.title,
                text: ad.text,
                categoryid: ad.categoryId,
                townid: ad.townId,
                imageDataUrl: ad.imageDataUrl
            },
            {
                headers: {
                    Authorization: 'Bearer ' + user.token
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

    function getUserAds(user, urlParams){
        var defer = $q.defer();

        var parameters = '';

        for (var par in urlParams){
            parameters += '&' + urlParams[par];
        }

        $http.get(API_URL + '/ads?pagesize=3' + parameters, {
            headers: {
                Authorization: 'Bearer ' + user.token
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

    function deactivateAd(user, id){
        var defer = $q.defer();

        $http.put(API_URL + '/ads/deactivate/' + id, '', {
            headers: {
                Authorization: 'Bearer ' + user.token
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

    function publishAgainAd(user, id){
        var defer = $q.defer();

        $http.put(API_URL + '/ads/publishagain/' + id, '', {
            headers: {
                Authorization: 'Bearer ' + user.token
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

    function deleteAd(user, id){
        var defer = $q.defer();

        $http.delete(API_URL + '/ads/' + id, {
            headers: {
                Authorization: 'Bearer ' + user.token
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

    function getAdBuId(user, id){
        var defer = $q.defer();

        $http.get(API_URL + '/ads/' + id, {
            headers: {
                Authorization: 'Bearer ' + user.token
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

    function editAd(user, ad){
        var defer = $q.defer();

        $http.put(API_URL + '/ads/' + ad.id,
            {
                title: ad.title,
                text: ad.text,
                changeimage: false,
                ImageDataURL: ad.imageDataURL,
                categoryid: ad.categoryId,
                townid: ad.townId
            },
            {
            headers: {
                Authorization: 'Bearer ' + user.token
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
        publishNewAd: publishNewAd,
        getUserAds: getUserAds,
        deactivateAd: deactivateAd,
        publishAgainAd: publishAgainAd,
        deleteAd: deleteAd,
        getAdBuId: getAdBuId,
        editAd: editAd
    }
});
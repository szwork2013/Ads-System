app.factory('userFactory', function($http, $q){
    var API_URL = 'http://softuni-ads.azurewebsites.net/api';

    function publishNewAd(ad, user){
        var defer = $q.defer();
        var userUrl = user.isAdmin ? '/admin' : '/user';

        $http.post(API_URL + userUrl + '/ads',
            {
                title: ad.title,
                text: ad.text,
                categoryid: ad.categoryId,
                townid: ad.townId,
                imageDataUrl: ad.imageDataUrl
            },
            {
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

    function getUserAds(user, urlParams){
        var defer = $q.defer();
        var userUrl = user.isAdmin ? '/admin' : '/user';

        var parameters = '';

        for (var par in urlParams){
            parameters += '&' + urlParams[par];
        }

        $http.get(API_URL + userUrl + '/ads?pagesize=3' + parameters, {
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

    function deactivateAd(user, id){
        var defer = $q.defer();
        var userUrl = user.isAdmin ? '/admin' : '/user';

        $http.put(API_URL + userUrl + '/ads/deactivate/' + id, '', {
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

    function publishAgainAd(user, id){
        var defer = $q.defer();
        var userUrl = user.isAdmin ? '/admin' : '/user';

        $http.put(API_URL + userUrl + '/ads/publishagain/' + id, '', {
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

    function deleteAd(user, id){
        var defer = $q.defer();
        var userUrl = user.isAdmin ? '/admin' : '/user';

        $http.delete(API_URL + userUrl + '/ads/' + id, {
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

    function getAdBuId(user, id){
        var defer = $q.defer();
        var userUrl = user.isAdmin ? '/admin' : '/user';

        $http.get(API_URL + userUrl + '/ads/' + id, {
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

    function editAd(user, ad){
        var defer = $q.defer();
        var userUrl = user.isAdmin ? '/admin' : '/user';
        var data = user.isAdmin ? {
            title: ad.title,
            text: ad.text,
            changeimage: ad.changeImage,
            ImageDataURL: ad.imageDataUrl,
            categoryid: ad.categoryId,
            townid: ad.townId,
            status: ad.status,
            date: ad.date
        } : {
            title: ad.title,
            text: ad.text,
            changeimage: ad.changeImage,
            ImageDataURL: ad.imageDataUrl,
            categoryid: ad.categoryId,
            townid: ad.townId
        };

        $http.put(API_URL + userUrl + '/ads/' + ad.id, data,
            {
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
        publishNewAd: publishNewAd,
        getUserAds: getUserAds,
        deactivateAd: deactivateAd,
        publishAgainAd: publishAgainAd,
        deleteAd: deleteAd,
        getAdBuId: getAdBuId,
        editAd: editAd
    }
});
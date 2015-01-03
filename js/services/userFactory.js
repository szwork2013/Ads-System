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

    function getUserAds(user, page){
        var defer = $q.defer();

        if (page){
            page = '&startpage=' + page;
        }
        else {
            page = '';
        }

        $http.get(API_URL + '/ads?pagesize=3' + page, {
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
        getUserAds: getUserAds
    }
});
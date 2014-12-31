app.factory('userFactory', function($http, $q, $window){
    var API_URL = 'http://softuni-ads.azurewebsites.net/api/user';
    var userInfo = JSON.parse($window.sessionStorage['userInfo']);

    function publishNewAd(ad){
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
                    Authorization: 'Bearer ' + userInfo.token
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
        publishNewAd: publishNewAd
    }
});
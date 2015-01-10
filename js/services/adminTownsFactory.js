app.factory('adminTownsFactory', function($http, $q){
    var API_URL = 'http://softuni-ads.azurewebsites.net/api/admin/towns';

    function getTowns(user, urlParams){
        var defer = $q.defer();

        var parameters = '';

        for (var par in urlParams){
            parameters += '&' + urlParams[par];
        }

        $http.get(API_URL + '?pagesize=8' + parameters, {
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
        getTowns: getTowns
    }
});
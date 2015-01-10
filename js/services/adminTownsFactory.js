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

    function editTown(user, town){
        var defer = $q.defer();

        $http.put(API_URL + '/' + town.id, {
                name: town.username
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

    function createTown(user, town){
        var defer = $q.defer();

        $http.post(API_URL, {
                name: town.name
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

    function deleteTown(user, town){
        var defer = $q.defer();

        $http.delete(API_URL + '/' + town.id,
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
        getTowns: getTowns,
        editTown: editTown,
        createTown: createTown,
        deleteTown: deleteTown
    }
});
app.factory('adminUsersFactory', function($http, $q){
    var API_URL = 'http://softuni-ads.azurewebsites.net/api/admin';

    function getUsers(user, urlParams){
        var defer = $q.defer();

        var parameters = '';

        for (var par in urlParams){
            parameters += '&' + urlParams[par];
        }

        $http.get(API_URL + '/users?pagesize=10' + parameters, {
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

    function editUser(user, data){
        var defer = $q.defer();

        $http.put(API_URL + '/user/' + data.username,{
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
            townid: data.townId
        }, {
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
        getUsers: getUsers,
        editUser: editUser
    }
});
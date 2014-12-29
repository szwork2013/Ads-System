app.factory('authRequester', function($http, $q){

    function loginUser(user, pass){
        var defer = $q.defer();

        $http.post('http://softuni-ads.azurewebsites.net/api/user/login',
            {
                username: user,
                password: pass
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
        loginUser: loginUser
    }
});
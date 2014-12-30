app.factory('authRequester', function($http, $q, $window, $rootScope){

    var API_URL = 'http://softuni-ads.azurewebsites.net/api/user';
    var userInfo;

    function loginUser(user, pass){
        var defer = $q.defer();

        $http.post(API_URL + '/login',
            {
                username: user,
                password: pass
            })
            .success(function (data, status, headers, config) {
                userInfo = {
                    userName: data.username,
                    token: data.access_token
                };
                $window.sessionStorage['userInfo'] = JSON.stringify(userInfo);
                defer.resolve(userInfo);
            })
            .error(function (data, status, headers, config) {
                defer.reject(data);
            });

        return defer.promise;
    }

    function logoutUser(token){
        var defer = $q.defer();

        $http.post(API_URL + '/logout', '',
            {
                headers: {'Authorization': 'Bearer ' + token}
            })
            .success(function (data, status, headers, config) {
                $window.sessionStorage["userInfo"] = null;
                userInfo = null;
                defer.resolve(data);
            })
            .error(function (data, status, headers, config) {
                defer.reject(data);
            });

        return defer.promise;
    }

    function getUserInfo() {
        return userInfo;
    }

    function init() {
        if ($window.sessionStorage["userInfo"]) {
            userInfo = JSON.parse($window.sessionStorage["userInfo"]);
            $rootScope.user = userInfo;
        }
    }

    init();

    return {
        loginUser: loginUser,
        getUserInfo: getUserInfo,
        logoutUser: logoutUser
    }
});
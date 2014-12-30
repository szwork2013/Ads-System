app.factory('authRequester', function($http, $q, $window, $rootScope){

    var API_URL = 'http://softuni-ads.azurewebsites.net/api/user';
    var userInfo;

    function registerUser(user){
        var defer = $q.defer();

        $http.post(API_URL + '/register',
            {
                username: user.username,
                password: user.password,
                confirmPassword: user.passwordConfirmation,
                name: user.name,
                email: user.email,
                phone: user.phone,
                townId: user.townId
            })
            .success(function (data, status, headers, config) {
                defer.resolve(data);
            })
            .error(function (data, status, headers, config) {
                defer.reject(data);
            });

        return defer.promise;
    }

    function loginAfterRegistration(data){
        userInfo = {
            userName: data.username,
            token: data.access_token
        };
        $window.sessionStorage['userInfo'] = JSON.stringify(userInfo);
        $rootScope.user = userInfo;
    }

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
        registerUser: registerUser,
        loginAfterRegistration: loginAfterRegistration,
        loginUser: loginUser,
        getUserInfo: getUserInfo,
        logoutUser: logoutUser
    }
});
app.factory('authFactory', function($http, $q, $window, $rootScope){

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
                userInfo = data;
                $window.sessionStorage['userInfo'] = JSON.stringify(userInfo);
                defer.resolve(userInfo);
            })
            .error(function (data, status, headers, config) {
                defer.reject(data);
            });

        return defer.promise;
    }

    function logoutUser(user){
        var defer = $q.defer();

        $http.post(API_URL + '/logout', '',
            {
                headers: {'Authorization': 'Bearer ' + user.access_token}
            })
            .success(function (data, status, headers, config) {
                $window.sessionStorage.clear();
                userInfo = null;
                defer.resolve(data);
            })
            .error(function (data, status, headers, config) {
                defer.reject(data);
            });

        return defer.promise;
    }

    function getUser(user){
        var defer = $q.defer();

        $http.get(API_URL + '/profile', {
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

        $http.put(API_URL + '/profile',{
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

    function changePassword(user, pass){
        var defer = $q.defer();

        $http.put(API_URL + '/changePassword', {
            oldPassword: pass.oldPassword,
            newPassword: pass.newPassword,
            confirmPassword: pass.confirmPassword
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

    function getUserInfo() {
        return userInfo;
    }

    function init() {
        if ($window.sessionStorage["userInfo"]) {
            userInfo = JSON.parse($window.sessionStorage['userInfo']);
            $rootScope.user = userInfo;
        }
    }

    init();

    return {
        registerUser: registerUser,
        loginAfterRegistration: loginAfterRegistration,
        loginUser: loginUser,
        getUserInfo: getUserInfo,
        logoutUser: logoutUser,
        getUser: getUser,
        editUser: editUser,
        changePassword: changePassword
    }
});
app.factory('adminCategoriesFactory', function($http, $q){
    var API_URL = 'http://softuni-ads.azurewebsites.net/api/admin/categories';

    function getCategories(user, urlParams){
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

    function editCategory(user, category){
        var defer = $q.defer();

        $http.put(API_URL + '/' + category.id, {
            name: category.username
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

    function createCategory(user, category){
        var defer = $q.defer();

        $http.post(API_URL, {
            name: category.name
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

    return {
        getCategories: getCategories,
        editCategory: editCategory,
        createCategory: createCategory
    }
});
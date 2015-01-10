app.controller('AdminHomeController', function(
    $scope,
    adminAdsFactory,
    dataFactory,
    userFactory,
    authFactory,
    createDialog){

    var userInfo = authFactory.getUserInfo();

    dataFactory.getCategories()
        .then(function(data){
            $scope.categories = data;
        });

    dataFactory.getTowns()
        .then(function(data){
            $scope.towns = data;
        });

    $scope.urlParams = [];

    $scope.getCategoryId = function(id){
        $scope.urlParams['categoryIdParam'] = 'categoryid=' + id;
        delete $scope.urlParams['currentPage'];
        urlParser();
    };

    $scope.getTownId = function(id){
        $scope.urlParams['townIdParam'] = 'townid=' + id;
        delete $scope.urlParams['currentPage'];
        urlParser();
    };

    $scope.getAllCategories = function(){
        delete $scope.urlParams['categoryIdParam'];
        urlParser();
    };

    $scope.getAllTowns = function(){
        delete $scope.urlParams['townIdParam'];
        urlParser();
    };

    $scope.getAdByStatus = function(status){
        $scope.urlParams['status'] = 'status=' + status;
        delete $scope.urlParams['currentPage'];
        urlParser();
    };

    $scope.showPage = function(text, page){
        $scope.urlParams['currentPage'] = 'startpage=' + page;
        urlParser();
    };

    function urlParser(){
        adminAdsFactory.getAds(userInfo, $scope.urlParams)
            .then(function(data){
                $scope.allAds = data;
            }, function(error){
                console.log(error);
            });
    }

    $scope.approveAd = function(ad){
        adminAdsFactory.approveAd(userInfo, ad)
            .then(function(data){
                $scope.successMessage = data.message;
                urlParser();
            }, function(error){
                console.log(error);
            })
    };

    $scope.rejectAd = function(ad){
        adminAdsFactory.rejectAd(userInfo, ad)
            .then(function(data){
                $scope.successMessage = data.message;
                urlParser();
            }, function(error){
                console.log(error);
            })
    };

    function deleteAd(ad){
        userFactory.deleteAd(userInfo, ad.id)
            .then(function(data){
                $rootScope.successMessage = data.message;
                urlParser();
            }, function(error){
                console.log(error);
            });
    }

    $scope.confirmDeletion = function(ad){
        createDialog('../../templates/delete-ad-confirmation.html',{
            id : 'simpleDialog',
            title: 'Confirm deletion',
            backdrop: true,
            success: {
                label: 'DELETE',fn: function(){
                    deleteAd(ad);
                }
            }
        });
    };

    $scope.closeMessage = function(){
        $rootScope.successMessage = undefined;
    };

    urlParser();
});
app.directive('fallbackSrc', function () {
    var fallbackSrc = {
        link: function postLink(scope, iElement, iAttrs) {
            iElement.bind('error', function() {
                angular.element(this)
                    .attr('src', iAttrs.fallbackSrc)
                    .attr("class", 'img-thumbnail pull-left');
            });
        }
    };
    return fallbackSrc;
});
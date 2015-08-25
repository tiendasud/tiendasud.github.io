/**
 * Created by juancalderon on 7/8/2015.
 */
(function () {
    'use strict';
    angular
        .module('Store')
        .directive('navBar',navBar);

    function navBar(){
        return {
            restrict : 'E',
            templateUrl: 'app/modules/navbar/navbar.template.html',
            link: linker //Best Practice: use controller when you want to expose an API to other directives. Otherwise use link.
        };

        function linker(scope) {
            scope.tab = 1;
            scope.setTab = selectTab;
            scope.isSet = isSelected;

            function selectTab(selectedTab){
                scope.tab = selectedTab;
            }

            function isSelected(checkTab){
                return scope.tab === checkTab;
            }
        }
    }
})();
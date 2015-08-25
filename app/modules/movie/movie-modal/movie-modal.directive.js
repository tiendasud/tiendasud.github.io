/**
 * Created by Administrator on 7/27/2015.
 */
(function () {
    'use strict';
    angular
        .module('Store')
        .directive('movieModal', movieModal);

    function movieModal() {
        return {
            restrict: 'E',
            templateUrl: 'app/modules/movie/movie-modal/movie-modal-template.html'
        }
    }
})();
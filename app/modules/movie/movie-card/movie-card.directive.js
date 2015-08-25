/**
 * Created by JuanCalderon on 7/27/2015.
 */
(function () {
    'use strict';
    angular
        .module('Store')
        .directive('movieCard', movieCard);

    function movieCard() {
        return {
            restrict: 'E',
            templateUrl: 'app/modules/movie/movie-card/movie-card.template.html'
        }
    }
})();
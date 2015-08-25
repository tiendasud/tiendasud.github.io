(function () {
    'use strict';
    angular
        .module("Store")
        .controller('MovieController', [
            '$http',
            MovieController]
    )

    function MovieController($http){
        var vm = this;
        vm.movies = [];
        vm.movie = {};
        vm.tipoOrden = 'title';
        vm.setMovie = setMovie;

        function setMovie(currentMovie){
            vm.movie = currentMovie;
        }

        $http.get('assets/movies.json').success(getResult);

        function getResult(data){
            vm.movies = data.videodb.movie;
        }
    }
})();
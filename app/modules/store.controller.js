(function () {
    'use strict';
    angular
        .module("store", [])
        .controller('storeController', [
            '$http',
            storeController]
    )

    function storeController($http){
        var vm = this;
        vm.movies = [];
        vm.tipoOrden = 'title';
        $http.get('assets/movies.json').success(getResult);

        function getResult(data){
            vm.movies = data.videodb.movie;
        }
    }
})();
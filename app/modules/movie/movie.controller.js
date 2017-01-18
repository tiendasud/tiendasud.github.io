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
        vm.storeData = {};
        vm.tipoOrden = 'title';
        vm.price = 0;
        vm.addRemoveMovie = addRemoveMovie;

        function addRemoveMovie(currentMovie, confirmed){
            if (confirmed){
                vm.storeData.count++;   
                vm.storeData.size += currentMovie.mediaInfo.size;
                vm.storeData.ids.push(currentMovie.tmdbId);
            }else {
                vm.storeData.count--;
                vm.storeData.size -= currentMovie.mediaInfo.size;
                var index = vm.storeData.ids.indexOf(currentMovie.tmdbId);
                vm.storeData.ids.splice(index, 1);
            }
            
            vm.storeData.price = vm.storeData.count * vm.price; 
            vm.storeData.sizeString = formatBytes(vm.storeData.size, 1)            
        }

        $http.get('assets/movies.json').success(getResult);

        function getResult(data){
            vm.movies = data.movies;
            vm.price = data.priceMovies;
            
            vm.storeData.ids = [];
            vm.storeData.count = 0;            
            vm.storeData.size = 0;
            vm.storeData.price = 0;            
            vm.storeData.sizeString = '';
        }
        
        function formatBytes(bytes,decimals) {
           if(bytes == 0) return '0 Byte';
           var k = 1000;
           var dm = decimals + 1 || 3;
           var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
           var i = Math.floor(Math.log(bytes) / Math.log(k));
           return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        }
    }
})();
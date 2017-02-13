(function () {
    'use strict';
    angular
        .module("Store")
        .controller('MovieController', [
            '$http',
            'FileSaver',
            'Blob',
            MovieController]
    )

    function MovieController($http, FileSaver, Blob){
        var vm = this;
        vm.movies = [];
        vm.storeData = {};
        vm.tipoOrden = 'title';
        vm.moviesPrice = 0;
        vm.typeStorage = 'usb32';
        vm.usb32 = {"price":100, "name":"32GB USB Pen Drive", "capacityReal":30000000000};
        vm.usb64 = {"price":200, "name":"64GB USB Pen Drive", "capacityReal":60000000000};
        vm.micro32 = {"price":100, "name":"32GB MicroSD", "capacityReal":30000000000};
        vm.micro64 = {"price":200, "name":"64GB MicroSD", "capacityReal":60000000000};

        vm.addRemoveMovie = addRemoveMovie;
        vm.openWindow = openWindow;

        $http.get('assets/movies.json').success(getResult);
        function getResult(data){
            vm.movies = data.movies;
            vm.moviesPrice = data.priceMovies;
            vm.generateFile = generateFile;
            vm.updateTotalPrice = updateTotalPrice;
            
            vm.storeData.ids = [];
            vm.storeData.count = 0;            
            vm.storeData.size = 0;
            vm.storeData.sizeString = formatBytes(vm.storeData.size, 1)
            vm.storeData.storage = vm.usb32;
            vm.storeData.moviesPrice = 0;

            vm.usb32.capacity = formatBytes(vm.usb32.capacityReal, 1);
            vm.usb64.capacity = formatBytes(vm.usb64.capacityReal, 1);
            vm.micro32.capacity = formatBytes(vm.micro32.capacityReal, 1);
            vm.micro64.capacity = formatBytes(vm.micro64.capacityReal, 1);

            updateTotalPrice();
        }

        function updateTotalPrice(){
            if(vm.typeStorage === 'usb32'){
                vm.storeData.storage = vm.usb32;
            }

            if(vm.typeStorage === 'usb64'){
                vm.storeData.storage = vm.usb64;
            }

            if(vm.typeStorage === 'micro32'){
                vm.storeData.storage = vm.micro32;
            }

            if(vm.typeStorage === 'micro64'){
                vm.storeData.storage = vm.micro64;
            }

            vm.storeData.totalPrice = vm.storeData.storage.price + vm.storeData.moviesPrice;
        }

        function generateFile(){
            var data = new Blob([angular.toJson(vm.storeData, false)], { type: 'text/plain;charset=utf-8' });
            FileSaver.saveAs(data, 'pedido.txt');
        }

        function openWindow(id){
            window.open("https://www.themoviedb.org/movie/" + id + "?language=es-ES");
        }

        function addRemoveMovie(currentMovie){
            if (currentMovie.selected){
                if (vm.storeData.storage.capacityReal < vm.storeData.size + currentMovie.mediaInfo.size){
                    var message = vm.storeData.sizeString +'  de  '+ vm.storeData.storage.capacity + '\n';
                    message += 'Ya no se puede agregar mas elementos, capacidad maxima alcanzada.'
                    alert(message);
                    currentMovie.selected = false;
                    return;
                }

                vm.storeData.count++;
                vm.storeData.size += currentMovie.mediaInfo.size;
                vm.storeData.ids.push(currentMovie.tmdbId);
            }else {
                vm.storeData.count--;
                vm.storeData.size -= currentMovie.mediaInfo.size;
                var index = vm.storeData.ids.indexOf(currentMovie.tmdbId);
                vm.storeData.ids.splice(index, 1);
            }

            vm.storeData.moviesPrice = vm.storeData.count * vm.moviesPrice;
            vm.storeData.sizeString = formatBytes(vm.storeData.size, 1)
            updateTotalPrice();
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
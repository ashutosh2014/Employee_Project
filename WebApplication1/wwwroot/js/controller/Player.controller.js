angular.module("AngularFrom.PlayerController", ["AngularFrom.PlayerService"]).
    controller("PlayerController", function ( PlayerService, $filter) {
        var vm = this;
        
        vm.noOfPage = 5;
        vm.noOfPages = [2, 5, 10, 20];
        vm.searchValue = "";
        vm.searchField = "Search in all";
        vm.searches = [
            { value: "Search in all", field: "--Select--" },
            { value: "Name", field: "Name" },
            { value: "Club", field: "Club" },
            { value: "Country", field: "Country" }
        ];
        vm.selectedSearhItem = vm.searches[0];
        vm.showLoading = true;
        var orderBy = $filter('orderBy');
        vm.prevOrderArg = 'name';
        vm.dirName = '';
        vm.dirClub = '';    
        vm.dirCountry = '';


        vm.SearchChange = function () {
            vm.searchField = vm.selectedSearhItem.value
            /*PlayerService.GetPlayerBySearch(vm.searchValue, vm.searchField).then((response) => {
                vm.players = response.data;
            })*/
        }

        vm.OrderEmployee = function (orderValue) {
            var orderDir = 'up'
            if (vm.prevOrderArg === orderValue) {
                orderValue = "-" + orderValue;
                orderDir = 'down';
            }
            vm.dirName = '';
            vm.dirClub = '';
            vm.dirCountry = '';

            switch (orderValue) {
                case 'name':
                case '-name':
                    vm.dirName = orderDir
                    break
                case 'club':
                case '-club':
                    vm.dirClub = orderDir
                    break
                case 'country':
                case '-country':
                    vm.dirCountry = orderDir
                    break
            }
            vm.players = orderBy(vm.players, orderValue);
            vm.prevOrderArg = orderValue;
        }

        PlayerService.GetPlayerFromDb().then((d) => {
            vm.players = d.data;
            vm.showLoading = false;
        })

        vm.DeletePlayer = function (id,index) {
            vm.players.splice(index, 1);
            PlayerService.DeletePlayer(id);
        }
    })
angular.module("AngularFrom.PlayerFilter", []).
    filter("filterPlayer", function () {
        return function (players, playerValue, playerField) {
            var items = [];
            if (playerValue === "") {
                return players
            }
            angular.forEach(players, function (player, key) {
                var flag = false
                switch (playerField.field) {
                    case "Name": flag = player.name.includes(playerValue);
                        break;
                    case "Club": flag = player.club.includes(playerValue);
                        break;
                    case "Country": flag = player.country.includes(playerValue);
                        break;
                    case "--Select--": flag = player.name.includes(playerValue) ||
                                                player.club.includes(playerValue) ||
                                                player.country.includes(playerValue);
                        break;
                }
                if (flag) {
                    items.push(player);
                }
            })
            return items
        }
    })


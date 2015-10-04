var app = angular.module('myApp', []);

app.controller('mainCtrl', ['$scope', '$http', "$location", function($scope, $http, $location) {
	$scope.saved = localStorage.getItem('myPokemon');
	$scope.myPokemon = (localStorage.getItem('myPokemon')!==null) ? JSON.parse($scope.saved) : [];
	localStorage.setItem('myPokemon', JSON.stringify($scope.myPokemon));
	$scope.partyPokemon = $scope.myPokemon.slice(0, 6);
	$scope.pcPokemon = $scope.myPokemon.slice(6, $scope.myPokemon.length);
	if ($scope.pcPokemon.length > 0) {
		$scope.hasSixPokemon = true;
	}
	else {
		$scope.hasSixPokemon = false;
	}
	$scope.addPokemon = function() {
			$http.get('http://pokeapi.co/api/v1/pokedex/1').success(function(response) {
				angular.forEach(response.pokemon, function(poke) {
					if(poke.name===$scope.pokemonText){
						console.log(poke);
						$scope.myPokemon.push({
							pokemon: poke.name,
							nickname: $scope.nicknameText,
							imageUrl: 'http://img.pokemondb.net/artwork/'+$scope.pokemonText+'.jpg'
						});
						console.log($scope.myPokemon);
						localStorage.setItem('myPokemon', JSON.stringify($scope.myPokemon));
					}
				});
				window.location.reload();
				$scope.pokemonText = "";
				$scope.nicknameText = "";
			}, function(response) {
				console.log(response);
			});
		};

  $scope.releasePokemon = function() {
    console.log($scope.myPokemon);
    $scope.myPokemon.splice(this.$index, 1);
    console.log(this.$index);
    localStorage.setItem('myPokemon', JSON.stringify($scope.myPokemon));
		window.location.reload();
  };

  $scope.moveToPC = function() {
		console.log(this.pokemon);
		tempPoke = this.pokemon;
    $scope.myPokemon.splice(this.$index, 1);
		$scope.myPokemon.push(tempPoke);
    console.log($scope.myPokemon);
    localStorage.setItem('myPokemon', JSON.stringify($scope.myPokemon));
		window.location.reload();
  };

	$scope.releaseAll = function() {
		$scope.myPokemon = [];
		localStorage.setItem('myPokemon', JSON.stringify($scope.myPokemon));
		window.location.reload();
	};
}]);

var app = angular.module('myApp', []);

app.controller('mainCtrl', ['$scope', '$http', "$location", function($scope, $http, $location) {
	$scope.editing = false;
	$scope.newName =[];

	$scope.held = localStorage.getItem('myParty');
	$scope.myParty = (localStorage.getItem('myParty')!==null) ? JSON.parse($scope.held) : [];
	localStorage.setItem('myParty', JSON.stringify($scope.myParty));
	$scope.partyPokemon = $scope.myParty;


	$scope.saved = localStorage.getItem('myPokemon');
	$scope.myPokemon = (localStorage.getItem('myPokemon')!==null) ? JSON.parse($scope.saved) : [];
	localStorage.setItem('myPokemon', JSON.stringify($scope.myPokemon));
	$scope.pcPokemon = $scope.myPokemon;

	var checkParty = function() {
		if ($scope.partyPokemon.length === 6) {
			$scope.hasSixPokemon = true;
		}
		else {
			$scope.hasSixPokemon = false;
		}
	};

	$scope.openEdit = function() {
		$scope.editing = true;
		$scope.nickname = this.pokemon.nickname;
	};

	$scope.editPcPokemon = function() {
		this.pokemon.nickname = this.nicknameText;
		localStorage.setItem('myPokemon', JSON.stringify($scope.myPokemon));
		$scope.editing = false;
	};
	$scope.editPartyPokemon = function() {
		this.pokemon.nickname = this.nicknameText;
		localStorage.setItem('myParty', JSON.stringify($scope.myParty));
		$scope.editing = false;
	};

	$scope.addPokemon = function() {
			$http.get('http://pokeapi.co/api/v1/pokedex/1').success(function(response) {
				angular.forEach(response.pokemon, function(poke) {
					if(poke.name===$scope.pokemonText){
						checkParty();
						if($scope.hasSixPokemon) {
							$scope.myPokemon.push({
								pokemon: poke.name,
								nickname: $scope.nicknameText,
								imageUrl: 'http://img.pokemondb.net/artwork/'+$scope.pokemonText+'.jpg'
							});
							localStorage.setItem('myPokemon', JSON.stringify($scope.myPokemon));
						}
						else {
							$scope.myParty.push({
								pokemon: poke.name,
								nickname: $scope.nicknameText,
								imageUrl: 'http://img.pokemondb.net/artwork/'+$scope.pokemonText+'.jpg'
							});
							localStorage.setItem('myParty', JSON.stringify($scope.myParty));
						}
					}
				});
				window.location.reload();
				$scope.pokemonText = "";
				$scope.nicknameText = "";
			}, function(response) {
				console.log(response);
			});
		};

  $scope.releasePokemonFromPC = function() {
    $scope.myPokemon.splice(this.$index, 1);
    localStorage.setItem('myPokemon', JSON.stringify($scope.myPokemon));
		window.location.reload();
  };
  $scope.releasePokemonFromParty = function() {
    $scope.myParty.splice(this.$index, 1);
    localStorage.setItem('myParty', JSON.stringify($scope.myParty));
		window.location.reload();
  };

  $scope.moveToPC = function() {
		tempPoke = this.pokemon;
    $scope.myParty.splice(this.$index, 1);
		$scope.myPokemon.push(tempPoke);
    localStorage.setItem('myPokemon', JSON.stringify($scope.myPokemon));
    localStorage.setItem('myParty', JSON.stringify($scope.myParty));
		window.location.reload();
  };

	$scope.releaseAll = function() {
		$scope.myPokemon = [];
		localStorage.setItem('myPokemon', JSON.stringify($scope.myPokemon));
		window.location.reload();
	};

	$scope.putInParty = function() {
		checkParty();
		if($scope.hasSixPokemon === false) {
			tempPoke = this.pokemon;
			if ($scope.hasSixPokemon === false) {
				$scope.myParty.push(tempPoke);
				$scope.myPokemon.splice(this.$index, 1);
				localStorage.setItem('myParty', JSON.stringify($scope.myParty));
				localStorage.setItem('myPokemon', JSON.stringify($scope.myPokemon));
			}
		}
	};
}]);

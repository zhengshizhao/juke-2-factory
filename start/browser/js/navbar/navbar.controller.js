juke.controller('NavbarCtrl', function($scope, $rootScope) {

	$scope.viewAlbums = function() {
		$rootScope.$broadcast('viewSwap', {type: 'showAllAlbums'})
	}
	$scope.viewAllArtists = function(){
		$rootScope.$broadcast('viewSwap', {type: 'showAllArtists'});
	}

})


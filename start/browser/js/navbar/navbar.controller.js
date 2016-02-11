juke.controller('NavbarCtrl', function($scope, $rootScope) {

	$scope.viewAlbums = function() {
		$rootScope.$broadcast('showAllAlbums')
	}

})
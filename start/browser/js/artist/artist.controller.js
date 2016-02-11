juke.controller('ArtistsCtrl', function($scope,$log, $http, $rootScope){
	$scope.showAllArtists  = false;

	$http.get('/api/artists')
	.then(function(response) {
		return response.data;
	})
	.then(function(artists){
		$scope.artists = artists;
	}).catch($log.error);

	$scope.$on('viewSwap', function(e, data) {
    	if (data.type === 'showAllArtists') {
			$scope.showAllArtists = true;
		}
    	else $scope.showAllArtists = false;
  	});
  	$scope.showAnArtist = function(artist){
  		$rootScope.$broadcast('viewSwap', {type:'showArtist', artist: artist})
  	}

})

juke.controller('ArtistCtrl', function($scope, $http, $rootScope, PlayerFactory) {

	$scope.showArtist = false;

	$scope.$on('viewSwap', function(e, data) {
		console.log(data);
		if (data.type === 'showArtist') {
			$scope.showArtist = true;
			$scope.artist = data.artist;
			$http.get('/api/artists/'+ $scope.artist._id+'/albums')
			.then(function(res){return res.data;})
			.then(function(albums){
				$scope.artist.albums = albums;
			})

			$http.get('/api/artists/'+ $scope.artist._id+'/songs')
			.then(function(res){return res.data;})
			.then(function(songs){
				$scope.artist.songs = songs;
				$scope.artist.songs.forEach(function (song, i) {
					song.audioUrl = '/api/songs/' + song._id + '.audio';
				});
			});
			
    	} else {
    		$scope.showArtist = false;
    	}
	});

	$scope.playing = PlayerFactory.isPlaying;
	$scope.currentSong = PlayerFactory.getCurrentSong;
	
	$scope.toggle = function (song) {
		if (PlayerFactory.isPlaying() && song === PlayerFactory.getCurrentSong()) {
	  		PlayerFactory.pause();
		} else if (song === PlayerFactory.getCurrentSong() ) {
	    	PlayerFactory.resume();
		} else {
	    	PlayerFactory.start(song, $scope.artist.songs);
		}
	};

	$scope.loadAlbum = function(album) {
		$rootScope.$broadcast('viewSwap', {type: 'showAlbum', album: album})
	}

})
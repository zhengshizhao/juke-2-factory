'use strict';

juke.controller('AlbumCtrl', function($scope, $http, $rootScope, $log, StatsFactory, PlayerFactory) {

  $scope.album = null;

  $scope.showAlbum = false;
  
 // $log service can be turned on and off; also, pre-bound
 
  // main toggle
  $scope.toggle = function (song) {
    if (PlayerFactory.isPlaying() && song === PlayerFactory.getCurrentSong()) {
      PlayerFactory.pause()
    } else if (song === PlayerFactory.getCurrentSong() ) {
        PlayerFactory.resume()
    } else {
        PlayerFactory.start(song, $scope.album.songs);
    }
  };

  $scope.currentSong = PlayerFactory.getCurrentSong;
  $scope.playing  = PlayerFactory.isPlaying

  $scope.$on('viewSwap', function(e, data) {
    if (data.type === 'showAlbum') {
      var album = data.album;
    // console.log(e, ' album: ', album)

      $scope.album = album;
      $scope.showAlbum = true;

      album.imageUrl = '/api/albums/' + album._id + '.image';
      album.songs.forEach(function (song, i) {
        song.audioUrl = '/api/songs/' + song._id + '.audio';
      });

      $http.get('/api/albums/' + $scope.album._id)
      .then(res => res.data)
      .then(album => StatsFactory.totalTime(album) )
      .then(function(totalTime) {
          $scope.album.totalTime = StatsFactory.timeFormat(totalTime);
      })
      .catch($log.error);
    } else {
      $scope.showAlbum = false;
    }

  });

});

juke.controller('AlbumsCtrl', function($scope, $http, $rootScope) {

  $scope.showAll = false;

  $http.get('/api/albums/')
  .then(function (response) {
    $scope.albums = response.data;
  });

  $scope.showAlbum = function(album) {
    $rootScope.$broadcast('viewSwap', { type: 'showAlbum', album: album });
  }

  $scope.$on('viewSwap', function(e, data) {
    if (data.type === 'showAllAlbums') $scope.showAll = true;
    else $scope.showAll = false;
  })


});


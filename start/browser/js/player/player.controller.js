'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, Player) {

  // state
  $scope.currentSong = 

  // main toggle
  $scope.toggle = function (song) {
    if (Player.isPlaying()) Player.pause();
    else Player.getCurrentSong() === song ? Player.resume() : Player.start(song);
  };

  // outgoing events (to Album… or potentially other characters)
 
});

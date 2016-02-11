'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {

  // initialize audio player (note this kind of DOM stuff is odd for Angular)
  // audio.addEventListener('ended', $scope.next);
  // audio.addEventListener('timeupdate', function () {
  //   $scope.progress = 100 * audio.currentTime / audio.duration;
  //   $scope.$digest(); // no Angular-aware code is doing this for us here
  // });

  // state
  $scope.currentSong = PlayerFactory.getCurrentSong;
  $scope.playing = PlayerFactory.isPlaying;
  $scope.prev = PlayerFactory.previous;
  $scope.next = PlayerFactory.next;
  // main toggle
  $scope.toggle = function () {
    if (PlayerFactory.isPlaying()) PlayerFactory.pause();
    else PlayerFactory.resume(); //: PlayerFactory.start(song);
  };
  $scope.progress = function() {
    return 100 * PlayerFactory.getProgress();
  };

  // outgoing events (to Album… or potentially other characters)
 
});

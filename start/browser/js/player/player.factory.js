'use strict';

juke.factory('PlayerFactory', function($rootScope){

  var obj = {};

  var audio = document.createElement('audio');

  var playing = false;
  var playlist = null;
  var currentSong = null;
  var progress = 0;

  // initialize audio player (note this kind of DOM stuff is odd for Angular)
  audio.addEventListener('ended', obj.next);
  audio.addEventListener('timeupdate', function () {
    progress = audio.currentTime / audio.duration;
    $rootScope.$digest();
  });

  // functionality
  obj.pause = function () {
    audio.pause();
    playing = false;
  }

  obj.resume = function() {
  	audio.play();
  	playing = true;
  }

  obj.start = function(song, songList) {
    // stop existing audio (e.g. other song) in any case
    obj.pause();
    playing = true;
    // resume current song
    // if (song === currentSong) return audio.play();
    // enable loading new song
    currentSong = song;
    if (songList) playlist = songList;
    audio.src = song.audioUrl;
    audio.load();
    audio.play();
  }

  obj.isPlaying = function() {
  	return playing;
  }

  obj.getCurrentSong = function() {
  	return currentSong;
  }

  function mod (num, m) { 
  	return ((num % m) + m) % m;
  };

  // jump `interval` spots in album (negative to go back, default +1)
  function skip (interval) {
    if (!currentSong) return;
    console.log('current song: ', currentSong)
    console.log('playlist: ', playlist);
    var index = playlist.indexOf(currentSong);
    index = mod( (index + (interval || 1)), playlist.length );
    currentSong = playlist[index];
    console.log('new song: ', currentSong);
    if (playing) obj.start(currentSong);
  };

  obj.next = function() { skip(1); };
  obj.previous = function() { skip(-1); };

  obj.getProgress = function() {
  	if (!currentSong) return 0;
  	return progress;
  }

  return obj;
});
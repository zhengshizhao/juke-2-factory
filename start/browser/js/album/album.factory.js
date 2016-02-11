
juke.factory('StatsFactory', function ($q) {
    var statsObj = {};
    statsObj.totalTime = function (album) {
        var audio = document.createElement('audio');
        return $q(function (resolve, reject) {
            var sum = 0;
            var n = 0;
            function resolveOrRecur () {
                if (n >= album.songs.length) resolve(sum);
                else audio.src = album.songs[n++].audioUrl;
            }
            audio.addEventListener('loadedmetadata', function () {
                sum += audio.duration;
                resolveOrRecur();
            });
            resolveOrRecur();
        });
    };
    statsObj.timeFormat = function(minTime){  var hour, min, sec;
    		hour = Math.floor(minTime/ 60 /60);
    		min = Math.floor( (minTime/60) % 60);
    		sec = Math.floor(( (minTime/60) % 60) % 60);
    		return "" + hour + ":" + min + ":" + sec;
    }
    
    return statsObj;
});
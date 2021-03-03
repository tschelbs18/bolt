$(document).ready(function() {
  initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Page ready");
  initTimer();
  setInterval(updateTimer, 1000);
 	//initPlayer();
  //initCommandForm();
}

function initTimer()
{
  $('#time').text('Time: 0');
}

function updateTimer()
{
  var seconds_str = $('#time').text();
  var seconds = parseInt(seconds_str.substr(seconds_str.lastIndexOf(' '), 1000000000));
  seconds++;
  $('#time').text('Time: ' + seconds);
  var dist = $('#dist').text();
  var miles = parseInt(dist.substr(dist.lastIndexOf(' '), 1000000000));
  if (miles != 0) {
    var pace = Math.round(seconds / miles);
    pace = new Date(pace * 1000).toISOString().substr(14, 5);
    $('#pace').text('Pace: ' + pace + ' seconds per mile')
  } else {
    $('#pace').text('Pace: ')
  }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 +
          c(lat1 * p) * c(lat2 * p) *
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)) * 0.621371; // 2 * R; R = 6371 km // Convert to miles
}

const trackLocation = ({ onSuccess, onError = () => { } }) => {
  // Omitted for brevity

  return navigator.geolocation.watchPosition(onSuccess, onError, {
    enableHighAccuracy: true,
    timeout: 30000,
    maximumAge: 0
  });
};

const createMap = ({ lat, lng }) => {
  return new google.maps.Map(document.getElementById('map'), {
    center: { lat, lng },
    zoom: 15
  });
};

const createMarker = ({ map, position }) => {
  return new google.maps.Marker({ map, position });
};

const getCurrentPosition = ({ onSuccess, onError = () => { } }) => {
  if ('geolocation' in navigator === false) {
    return onError(new Error('Geolocation is not supported by your browser.'));
  }

  return navigator.geolocation.getCurrentPosition(onSuccess, onError);
};

const getPositionErrorMessage = code => {
  switch (code) {
    case 1:
      return 'Permission denied.';
    case 2:
      return 'Position unavailable.';
    case 3:
      return 'Timeout reached.';
    default:
      return null;
  }
};

function initMap() {
  const initialPosition = { lat: 32.7157, lng: 117.161 };
  const map = createMap(initialPosition);
  const marker = createMarker({ map, position: initialPosition });
  var start_lat, start_lng, curr_lat, curr_lng;

  // Use the new trackLocation function.
  trackLocation({
    onSuccess: ({ coords: { latitude: lat, longitude: lng } }) => {
      marker.setPosition({ lat, lng });
      map.panTo({ lat, lng });
      if (!start_lat) {
        start_lat = lat;
        start_lng = lng;
      }
      curr_lat = lat;
      curr_lng = lng;
      var distance = Math.round(calculateDistance(start_lat, start_lng, curr_lat, curr_lng) * 100) / 100;
      $('#dist').text('Distance: ' + distance);
      console.log(distance);
    },
    onError: err =>
      alert(`Error: ${getPositionErrorMessage(err.code) || err.message}`)
  });
}

$(function()
{
    var playerTrack = $("#player-track"), bgArtwork = $('#bg-artwork'), bgArtworkUrl, albumName = $('#album-name'), trackName = $('#track-name'), albumArt = $('#album-art'), sArea = $('#s-area'), seekBar = $('#seek-bar'), trackTime = $('#track-time'), insTime = $('#ins-time'), sHover = $('#s-hover'), playPauseButton = $("#play-pause-button"),  i = playPauseButton.find('i'), tProgress = $('#current-time'), tTime = $('#track-length'), seekT, seekLoc, seekBarPos, cM, ctMinutes, ctSeconds, curMinutes, curSeconds, durMinutes, durSeconds, playProgress, bTime, nTime = 0, buffInterval = null, tFlag = false, albums = ['Dawn','Me & You','Electro Boy','Home','Proxy (Original Mix)'], trackNames = ['Skylike - Dawn','Alex Skrindo - Me & You','Kaaze - Electro Boy','Jordan Schor - Home','Martin Garrix - Proxy'], albumArtworks = ['_1','_2','_3','_4','_5'], trackUrl = ['https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/2.mp3','https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/1.mp3','https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/3.mp3','https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/4.mp3','https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/5.mp3'], playPreviousTrackButton = $('#play-previous'), playNextTrackButton = $('#play-next'), currIndex = -1;

    function playPause()
    {
        setTimeout(function()
        {
            if(audio.paused)
            {
                playerTrack.addClass('active');
                albumArt.addClass('active');
                checkBuffering();
                i.attr('class','fas fa-pause');
                audio.play();
            }
            else
            {
                playerTrack.removeClass('active');
                albumArt.removeClass('active');
                clearInterval(buffInterval);
                albumArt.removeClass('buffering');
                i.attr('class','fas fa-play');
                audio.pause();
            }
        },300);
    }


	function showHover(event)
	{
		seekBarPos = sArea.offset();
		seekT = event.clientX - seekBarPos.left;
		seekLoc = audio.duration * (seekT / sArea.outerWidth());

		sHover.width(seekT);

		cM = seekLoc / 60;

		ctMinutes = Math.floor(cM);
		ctSeconds = Math.floor(seekLoc - ctMinutes * 60);

		if( (ctMinutes < 0) || (ctSeconds < 0) )
			return;

        if( (ctMinutes < 0) || (ctSeconds < 0) )
			return;

		if(ctMinutes < 10)
			ctMinutes = '0'+ctMinutes;
		if(ctSeconds < 10)
			ctSeconds = '0'+ctSeconds;

        if( isNaN(ctMinutes) || isNaN(ctSeconds) )
            insTime.text('--:--');
        else
		    insTime.text(ctMinutes+':'+ctSeconds);

		insTime.css({'left':seekT,'margin-left':'-21px'}).fadeIn(0);

	}

    function hideHover()
	{
        sHover.width(0);
        insTime.text('00:00').css({'left':'0px','margin-left':'0px'}).fadeOut(0);
    }

    function playFromClickedPos()
    {
        audio.currentTime = seekLoc;
		seekBar.width(seekT);
		hideHover();
    }

    function updateCurrTime()
	{
        nTime = new Date();
        nTime = nTime.getTime();

        if( !tFlag )
        {
            tFlag = true;
            trackTime.addClass('active');
        }

		curMinutes = Math.floor(audio.currentTime / 60);
		curSeconds = Math.floor(audio.currentTime - curMinutes * 60);

		durMinutes = Math.floor(audio.duration / 60);
		durSeconds = Math.floor(audio.duration - durMinutes * 60);

		playProgress = (audio.currentTime / audio.duration) * 100;

		if(curMinutes < 10)
			curMinutes = '0'+curMinutes;
		if(curSeconds < 10)
			curSeconds = '0'+curSeconds;

		if(durMinutes < 10)
			durMinutes = '0'+durMinutes;
		if(durSeconds < 10)
			durSeconds = '0'+durSeconds;

        if( isNaN(curMinutes) || isNaN(curSeconds) )
            tProgress.text('00:00');
        else
		    tProgress.text(curMinutes+':'+curSeconds);

        if( isNaN(durMinutes) || isNaN(durSeconds) )
            tTime.text('00:00');
        else
		    tTime.text(durMinutes+':'+durSeconds);

        if( isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds) )
            trackTime.removeClass('active');
        else
            trackTime.addClass('active');


		seekBar.width(playProgress+'%');

		if( playProgress == 100 )
		{
			i.attr('class','fa fa-play');
			seekBar.width(0);
            tProgress.text('00:00');
            albumArt.removeClass('buffering').removeClass('active');
            clearInterval(buffInterval);
		}
    }

    function checkBuffering()
    {
        clearInterval(buffInterval);
        buffInterval = setInterval(function()
        {
            if( (nTime == 0) || (bTime - nTime) > 1000  )
                albumArt.addClass('buffering');
            else
                albumArt.removeClass('buffering');

            bTime = new Date();
            bTime = bTime.getTime();

        },100);
    }

    function selectTrack(flag)
    {
        if( flag == 0 || flag == 1 )
            ++currIndex;
        else
            --currIndex;

        if( (currIndex > -1) && (currIndex < albumArtworks.length) )
        {
            if( flag == 0 )
                i.attr('class','fa fa-play');
            else
            {
                albumArt.removeClass('buffering');
                i.attr('class','fa fa-pause');
            }

            seekBar.width(0);
            trackTime.removeClass('active');
            tProgress.text('00:00');
            tTime.text('00:00');

            currAlbum = albums[currIndex];
            currTrackName = trackNames[currIndex];
            currArtwork = albumArtworks[currIndex];

            audio.src = trackUrl[currIndex];

            nTime = 0;
            bTime = new Date();
            bTime = bTime.getTime();

            if(flag != 0)
            {
                audio.play();
                playerTrack.addClass('active');
                albumArt.addClass('active');

                clearInterval(buffInterval);
                checkBuffering();
            }

            albumName.text(currAlbum);
            trackName.text(currTrackName);
            albumArt.find('img.active').removeClass('active');
            $('#'+currArtwork).addClass('active');

            bgArtworkUrl = $('#'+currArtwork).attr('src');

            bgArtwork.css({'background-image':'url('+bgArtworkUrl+')'});
        }
        else
        {
            if( flag == 0 || flag == 1 )
                --currIndex;
            else
                ++currIndex;
        }
    }

    function initSpeech() {

      // new speech recognition object
      var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
      var recognition = new SpeechRecognition();
      recognition.continuous = true;
      //recognition.interimResults = true;

      // This runs when the speech recognition service starts
      recognition.onstart = function() {

      };

      recognition.onend = function() {
          recognition.start();
          console.log("speech rec restarted");
      }

      // This runs when the speech recognition service returns result
      recognition.onresult = function(event) {
          var command = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
          var confidence = event.results[event.results.length - 1][0].confidence;
          console.log(command);
          if (command.includes('pause') || command.includes('play')){
            playPause();
          } else if (command.includes('skip') || command.includes('next')) {
            selectTrack(1);
          } else if (command.includes('back') || command.includes('previous')) {
            selectTrack(-1);
          } else if (command.includes('louder') || command.includes('volume up')) {
            if (audio.volume >= 0.8) {
              audio.volume = 1;
            } else {
              audio.volume += 0.2;
            }
          } else if (command.includes('softer') || command.includes('quiet') || command.includes('volume down')) {
            if (audio.volume <= 0.2) {
              audio.volume = 0;
            }
            else {
              audio.volume -= 0.2;
            }
          } else if (command.includes('mute') || command.includes('volume off')) {
            audio.volume = 0;
          } else if (command.includes('hype') || command == "let's go" || command == "let's get it") {
            currIndex = 1;
            selectTrack(1);
          } else if (command.includes("finish") || command.includes("end")) {
            window.location.replace("../finished_run");
          }

      };

       // start recognition
       recognition.start();
    }

    // init RSVP form submit listener
    function initCommandForm() {
      $('#user-input').submit(function(e) {
        e.preventDefault();
        var command = $('#command').val();
        console.log(command);
        if (command == 'pause' || command == 'play'){
          playPause();
        } else if (command == 'skip') {
          selectTrack(1);
        } else if (command == 'back') {
          selectTrack(-1);
        } else if (command == 'louder') {
          if (audio.volume >= 0.8) {
            audio.volume = 1;
          } else {
            audio.volume += 0.2;
          }
        } else if (command == 'softer') {
          if (audio.volume <= 0.2) {
            audio.volume = 0;
          }
          else {
            audio.volume -= 0.2;
          }
        } else if (command == 'mute') {
          audio.volume = 0;
        } else if (command == 'hype' || command == "let's go" ) {
          currIndex = 1;
          selectTrack(1);
        } else if (command == "finish" || command == "end run" || command == "finish run") {
          window.location.replace("../finished_run");
        }
        $('#command').val('');
      });
    }

    function initPlayer()
	{
        audio = new Audio();

		selectTrack(0);

		audio.loop = false;

		playPauseButton.on('click',playPause);

		sArea.mousemove(function(event){ showHover(event); });

        sArea.mouseout(hideHover);

        sArea.on('click',playFromClickedPos);

        $(audio).on('timeupdate',updateCurrTime);

        playPreviousTrackButton.on('click',function(){ selectTrack(-1);} );
        playNextTrackButton.on('click',function(){ selectTrack(1);});
	}

	initPlayer();
  initCommandForm();
  initSpeech();
});

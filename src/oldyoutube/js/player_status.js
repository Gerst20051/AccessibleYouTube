/*
 * Rounds N to the nearest integer
 */
function roundToInt(N) {
    return Math.floor(N+.5);
}

/*
 * I couldn't find any JS form of
 * formatString("%d:%02d", minutes, seconds)
 * so this function takes care of the "%02d" part
 */
function asStrLen2(N) {
    //N = roundToInt(N);
    if (N < 10) {
        return "0" + N;
    }
    else if (10 <= N && N < 100) {
        return "" + N;
    }
}

/*
 * Converts a total number of seconds into separate minute and
 * second parts. Note: totsecs MUST be an integer.
 */
function splitMinsAndSecs(totsecs) {
    secs = totsecs % 60;
    mins = (totsecs-secs) / 60;
    return {m: mins, s: secs};
}

/*
 * Updates the time label under the player to reflect the current
 * position in the movie.
 */
function updatePlaybackStatus() {
    var player = getYTPlayer();
    var state = player.getPlayerState();
    var text = "0:00/0:00";
    if (state == config.youtube.states.unstarted) {
        // Leave it as 0:00/0:00
    }
    else if (state == config.youtube.states.cued) {
        // Leave it as 0:00/0:00
        // This can be awkward at times, but the results of
        // getCurrentTime() and getDuration() are a bit
        // unpredictable when the player's state is "cued"
    }
    else {
        var duration = roundToInt(player.getDuration());
        var currtime = -1;
        if (state == config.youtube.states.ended) {
            currtime = duration;
        }
        else {
            currtime = roundToInt(player.getCurrentTime());
        }
        duration_s = splitMinsAndSecs(duration);
        currtime_s = splitMinsAndSecs(currtime);
        text = "";
        text += currtime_s.m;
        text += ":";
        text += asStrLen2(currtime_s.s);
        text += "/";
        text += duration_s.m;
        text += ":";
        text += asStrLen2(duration_s.s);
    }
    var statusbar = dojo.byId(config.IDs.player.status_bar);
    statusbar.innerHTML = text;
}

var prevPlayerState = config.youtube.states.unstarted;

/*
 * This function is automatically called whenever the YouTube player's
 * state changes.
 * It takes care of moving the chooser if the state change is not
 * the result of a cleanly executed action from one of the Accessible
 * YouTube scripts; for example, if a video is played to the end,
 * this function moves the chooser back to the movie list.
 */
function onYTPlayerStateChange(state) {
    console.log("Detected YTPlayer State Change.");
    console.log("Old state: " + prevPlayerState + ", new state: " + state);
    if (state == config.youtube.states.playing && areMovieChoicesActive()) {
        //console.log("Player is playing but controls are not active.");
        playCurrentMovie(getCurrentMenuAndSelection().selected);
        //console.log("Attempting to get focus back from player.");
        window.focus();
    }
    if (state == config.youtube.states.ended && arePlayerControlsActive()) {
        //console.log("Movie just ended. Moving controls back to movie list.");
        playermenu.choose_new(getCurrentMenuAndSelection().selected);
    }
    // This is here in case the user manages to pause the video by
    // some means other than the pause button. For example, if you
    // click the YouTube logo in the lower-right of the player, the
    // player state will change to "cued". This check rescues the
    // Pause button in cases like that.
    if (state != config.youtube.states.playing && arePlayerControlsActive()) {
        var pauseButton = dojo.byId(config.IDs.controls.pause);
        pauseButton.innerHTML = pauseButton.innerHTML.replace("Pause", "Play");
    }
    if (state == config.youtube.states.playing && arePlayerControlsActive()) {
        var pauseButton = dojo.byId(config.IDs.controls.pause);
        pauseButton.innerHTML = pauseButton.innerHTML.replace("Play", "Pause");
    }
    prevPlayerState = state;
}


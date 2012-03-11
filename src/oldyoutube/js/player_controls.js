/*
 * Selects the default player control.
 * In general, this function should be the cleanest way to move the
 * chooser to the player controls.
 */
function selectDefaultPlayerControl() {
    selectNode(dojo.byId(config.IDs.controls.pause));
}

/*
 * This is the onchoose function for the player controls.
 * It calls the appropriate function for the control.
 */
function usePlayerControl(curr) {
    var funcname = dojo.attr(curr, config.attrs.ctrl_func);
    var resetToDefault = dojo.attr(curr, config.attrs.ctrl_reset_to_default);
    eval("playermenu." + funcname + "(curr)");
    console.log(resetToDefault);
    if (eval(resetToDefault))
    {
        selectFirstChoiceInMenu(dojo.byId(config.IDs.player.ctrl_div));
        //selectDefaultPlayerControl();
    }
}

/*
 * List of functions for the player controls.
 */
var playermenu = {
    /*
     * Play/Pause
     */
    pause : function(selected) {
        var ytplayer = getYTPlayer();
        var state = ytplayer.getPlayerState();
        console.log("Attempting to pause/play. Current state: " + state);
        var pauseButton = dojo.byId(config.IDs.controls.pause);
        // if it's currently playing, pause
        if (state == config.youtube.states.playing)
        {
            ytplayer.pauseVideo();
            console.log(pauseButton.innerHTML);
            pauseButton.innerHTML = pauseButton.innerHTML.replace("Pause", "Play");
            //pauseButton.innerHTML = "Play";
        }
        // if it's not currently paused, play it.
        else
        {
            ytplayer.playVideo();
            console.log(pauseButton.innerHTML);
            pauseButton.innerHTML = pauseButton.innerHTML.replace("Play", "Pause");
        }
    },
    /*
     * Go back N seconds (default is currently 10)
     */
    rewind : function(selected) {
        var ytplayer = getYTPlayer();
        var delta = - config.settings.rewindAmt;
        var dest = ytplayer.getCurrentTime() + delta;
        ytplayer.seekTo(dest>0? dest : 0);
    },
    /*
     * Go forward N seconds (default is currently 10)
     */
    fforward : function(selected) {
        var ytplayer = getYTPlayer();
        var delta = config.settings.fforwardAmt;
        var dest = ytplayer.getCurrentTime() + delta;
        var dur = ytplayer.getDuration();
        ytplayer.seekTo(dest<dur? dest : dur);
    },
    /*
     * Go back to beginning of video.
     */
    restart : function(selected) {
        var ytplayer = getYTPlayer();
        ytplayer.seekTo(0);
    },
    /*
     * Stop the video and move the chooser back to the movie list.
     */
    choose_new : function(selected) {
        var ytplayer = getYTPlayer();
        // Turn off the movie while we're choosing the next one
        ytplayer.stopVideo();
        ytplayer.clearVideo();
        selectDefaultMovieChoice();
    },
    /*
     * Reloads the page with a list of related videos for the current
     * video as the new movie list.
     */
    get_related_videos : function(selected) {
        var ytplayer = getYTPlayer();
        var videoURL = ytplayer.getVideoUrl();
        var videoID = parseArgs(videoURL)["v"];
        playermenu.choose_new(selected);
        var s = "sway.html?";
        s += config.urlparams.feedsource + "=" + config.urlparams.related.src;
        s += "&" + config.urlparams.related.id + "=" + videoID;
        window.location = s;
    }
}



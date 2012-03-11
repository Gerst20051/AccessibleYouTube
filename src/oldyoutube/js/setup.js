var Switch1Binding, Switch2Binding;
var setupIntervalHandle;

/*
 * Once the YouTube player is set up, start setting up the rest
 * of the page.
 */
function onYouTubePlayerReady() {
    startTryingToSetup();
}

/*
 * Turn off the UI and then call tryToSetup repeatedly.
 * The reason for the repeated calling is so that if it fails once
 * (which was more likely before this was connected to the callback
 * from the YouTube player setup function), the page isn't necessarily
 * rendered useless.
 */
function startTryingToSetup() {
    disableUI();
    setupIntervalHandle = setInterval("tryToSetup()", 250);
}

/*
 * Called once the page is finished being set up.
 */
function stopTryingToSetup() {
    clearInterval(setupIntervalHandle);
    console.log("Finished setting up page.");
}

/*
 * Attempts to set up the page.
 */
function tryToSetup() {
    console.log("Trying to setup page.");
    var ytplayer = getYTPlayer();
    try
    {
        console.log("Adjusting volume of player");
        ytplayer.setVolume(config.player.initialVolume);
        console.log("Setting up keyboard");
        setupKeys();
        console.log("Setting up mouse");
        setupChoicesForMouse();
        console.log("Adding scrolling arrows");
        setupArrows();
        console.log("Adding back button");
        setupBackButton();
        console.log("Loading movies");
        var args = parseArgs(document.documentURI);
        setupMovieList(args);
        console.log("Setting up player state-change listener");
        setupPlayerStateChangeListener();
        console.log("Setting up playback status indicator");
        setupPlaybackStatusIndicator();
        console.log("Loading settings");
        setupSettings(args);
        console.log("Finished setting up");
        stopTryingToSetup();
        //return true;
    }
    catch (err)
    {
        console.log("Setup attempt failed. Will try again shortly.");
        //return false;
    }
}

/*
 * Connects the appropriate functions to the two switches.
 */
function setupKeys() {
    Switch1Binding = dojo.connect("Switch1Pressed", cycleSelected);
    Switch2Binding = dojo.connect("Switch2Pressed", chooseSelected);
    console.log("keys set up");
}

/*
 * Sets the appropriate attributes of all nodes with the choice class
 * so that they can be selected and chosen with the mouse.
 */
function setupChoicesForMouse() {
    var choices = dojo.query("." + config.classes.choice);
    for (var i=0; i<choices.length; ++i)
    {
        dojo.attr(choices[i], "onmouseover", "selectNodeIfApplicable(this);");
        dojo.attr(choices[i], "onclick", "chooseNodeIfApplicable(this);");
    }
    console.log("choices set up to allow mouse use");
}



/*
 * Fills in the HTML for arrows in the movielist.
 */
function setupArrows() {
    var movielist = dojo.byId(config.IDs.movielist.div);
    var left = dojo.byId(config.IDs.movielist.tobegenerated.l_arrow);
    var right = dojo.byId(config.IDs.movielist.tobegenerated.r_arrow);
    left.style.padding="0px";
    right.style.padding="0px";
    left.innerHTML = getArrowHTML(config.IDs.movielist.l_arrow, config.files.movielist.l_arrow, "scrollLeft", "Previous movies");
    right.innerHTML = getArrowHTML(config.IDs.movielist.r_arrow, config.files.movielist.r_arrow, "scrollRight", "Next movies");
}

/*
 * Generates the HTMl for arrows in the movielist.
 */
function getArrowHTML(id, src, funcName, msg) {
    var html = "";
    //html += "<td";
        //html += " style='";
            //html += "padding: 0px";
            //html += "'";
        //html += ">";
        html += " <div";
            html += " id='" + id + "'";
            html += " style='";
                html += "width: ";
                    html += IMG_WIDTH;
                    html += "px;";
            html += "'";
            html += " class='" + config.classes.choice;
                html += " " + config.classes.always_clickable;
                html += " " + config.classes.shown;
                html += "'";
            html += "'";
            html += " onmouseover='selectNodeIfApplicable(this);'";
            html += " onclick='chooseNodeIfApplicable(this);'";
            html += " " + config.attrs.onselect_func;
                html += "='afterSelectingAnArrow'";
            html += " " + config.attrs.onchoose_func;
                html += "='" + funcName + "'";
        html += "> ";
            html += "<img";
                html += " src='images/" + src + "'";
                html += " width='" + IMG_WIDTH + "'";
            html += "> ";
            html += "<p";
                html += " class='";
                    html += config.classes.tts_info;
                html += "'";
                html += " style='";
                    html += "margin:0px;";
                    html += " border: 1px solid black;";
                    html += " text-align: center;";
                    html += " overflow: hidden;";
                    html += " height: ";
                        html += TITLE_HEIGHT;
                        html += "px;";
                html += "'";
            html += "> ";
                html += msg;
            html += " </p>";
        html += " </div>";
    //html += " </td>";
    // console.log(html);
    return html;
}

/*
 * Fills in HTML for the back button.
 */
function setupBackButton() {
    var node = dojo.byId(config.IDs.movielist.tobegenerated.back_button);
    node.style.padding="0px";
    node.style.display="none";
    console.log("Getting HTML for button.");
    var html = getBackButtonHTML();
    console.log("Got HTML for button.");
    node.innerHTML = html;
}

/*
 * Generates HTML for the back button.
 * There's a lot of overlap between this and getArrowHTML().
 * It might be worthwhile to merge the two functions.
 */
function getBackButtonHTML() {
    var html = "";
    html += " <div";
        html += " id='" + config.IDs.movielist.back_button + "'";
        html += " style='";
            html += "width: ";
                html += IMG_WIDTH;
                html += "px;";
        html += "'";
        html += " class='" + config.classes.choice;
            html += " " + config.classes.not_shown;
            html += " " + config.classes.always_clickable;
            html += "'";
        html += "'";
        html += " onmouseover='selectNodeIfApplicable(this);'";
        html += " onclick='chooseNodeIfApplicable(this);'";
        html += " " + config.attrs.onselect_func;
            html += "='afterSelectingBackButton'";
        html += " " + config.attrs.onchoose_func;
            html += "='goBack'";
    html += "> ";
        html += "<img";
            html += " src='images/" + config.files.movielist.back_button + "'";
            html += " width='" + IMG_WIDTH + "'";
        html += "> ";
        html += "<p";
            html += " class='";
                html += config.classes.tts_info;
            html += "'";
            html += " style='";
                html += "margin:0px;";
                html += " border: 1px solid black;";
                html += " text-align: center;";
                html += " overflow: hidden;";
                html += " height: ";
                    html += TITLE_HEIGHT;
                    html += "px;";
            html += "'";
        html += "> ";
            html += "Back to previous page";
        html += " </p>";
    html += " </div>";
    return html;
}

/*
 * Figures out (based on arguments that should be passed in the URL)
 * from where the list of movies should come.
 * Gets that list.
 */
function setupMovieList(args) {
    var feedSource = args[config.urlparams.feedsource];
    delete args[config.urlparams.feedsource];
    if (feedSource == config.urlparams.playlist.src) {
        var id = args[config.urlparams.playlist.id];
        delete args[config.urlparams.playlist.id];
        YTPlaylistRetrieval(id, args);
    }
    else if (feedSource == config.urlparams.stdfeed.src) {
        var id = args[config.urlparams.stdfeed.id];
        delete args[config.urlparams.stdfeed.id];
        YTStdFeedRetrieval(id, args);
    }
    else if (feedSource == config.urlparams.search.src) {
        YTVideoSearch(args);
    }
    else if (feedSource == config.urlparams.related.src) {
        var id = args[config.urlparams.related.id];
        delete args[config.urlparams.related.id];
        YTRelatedRetrieval(id, args);
    }
    else {
        console.log("Warning: Feed source not recognized. No videos loaded.");
    }
}

/*
 * Connects onYTPlaterStateChange to the player so that it will be
 * automatically called whenever the player's state changes.
 */
function setupPlayerStateChangeListener() {
    player = getYTPlayer();
    player.addEventListener("onStateChange", "onYTPlayerStateChange");
}

/*
 * Sets the function responsible for updating the player's progress
 * to be called every half-second.
 * The displayed time may, therefore, be off by a second at any given
 * time, and it may appear a bit jumpy. However, checking every 100
 * milliseconds (or some other small amount of time) where we are
 * in the video just to make the displayed time progress smoothly seems
 * excessive.
 */
function setupPlaybackStatusIndicator() {
    var tmphandle = setInterval("updatePlaybackStatus()", 500);
}

/*
 * Implements the settings from config.settings (which should be set
 * according to the settings saved in the Accessible YouTube cookie),
 * where appropriate.
 * (Some settings can simply looked up when they're needed; those do
 * not need to be implemented here.)
 * The code for this function should just call a few other functions
 * for each group of related settings.
 */
function setupSettings(args) {
    disableBrowsingIfApplicable(args);
    disableUnwantedPlayerControls();
}

/*
 * Removes from the list of player controls those that the user has
 * elected to disable.
 */
function disableUnwantedPlayerControls() {
    if (!config.settings.ctrlenabled_fastfwd) {
        hidePlayerControl(dojo.byId(config.IDs.controls.fastfwd));
    }
    if (!config.settings.ctrlenabled_rewind) {
        hidePlayerControl(dojo.byId(config.IDs.controls.rewind));
    }
    if (!config.settings.ctrlenabled_restart) {
        hidePlayerControl(dojo.byId(config.IDs.controls.restart));
    }
    if (!config.settings.ctrlenabled_watch_related) {
        hidePlayerControl(dojo.byId(config.IDs.controls.get_related));
    }
}
/*
 * Hides the specified player control, rendering it unusable.
 */
function hidePlayerControl(node) {
    dojo.removeClass(node, config.classes.shown);
    dojo.addClass(node, config.classes.not_shown);
    node.style.display = "none";
}

/*
 * Sets flags to indicate whether browsing should be disabled.
 */
function disableBrowsingIfApplicable(args) {
    if (eval(args[config.urlparams.disable_browsing])) {
        config.settings.ctrlenabled_watch_related = false;
        config.settings.disable_browsing = true;
        // Simple way to just refresh the movie list.
        scroll(0, 1);
    }
}


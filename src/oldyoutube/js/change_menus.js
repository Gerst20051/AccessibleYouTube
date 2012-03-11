/*
 * Prepares the list of movie choices to be the active menu
 * (the one through which the user is scrolling).
 * Assumes that it previously was NOT the active menu.
 */
function activateMovieChoices() {
    //console.log("Activating movie choice menu.");
    var movielist = dojo.byId(config.IDs.movielist.div);
    var prevPlaying = dojo.query("." + config.classes.nowplaying + "." + config.classes.choice + "." + config.classes.movie, movielist);
    for (var i=0; i<prevPlaying.length; ++i) {
        dojo.removeClass(prevPlaying[i], config.classes.nowplaying);
    }
}

/*
 * Prepares the list of movie choices to be an inactive menu
 * (NOT the one through which the user is scrolling).
 * Assumes that it previously WAS the active menu.
 * Currently does nothing, but should still be called whenever
 * the chooser leaves the list of movie choices.
 */
function inactivateMovieChoices() {
    //console.log("Inactivating movie choice menu.");
}

/*
 * Prepares the player control menu to be the active menu
 * (the one through which the user is scrolling).
 * Assumes that it previously was NOT the active menu.
 */
function activatePlayerControls() {
    //console.log("Activating player controls.");
    var ctrldiv = dojo.byId(config.IDs.player.ctrl_div);
    dojo.removeClass(ctrldiv, config.classes.inactive);
}

/*
 * Prepares the player control menu to be an inactive menu
 * (NOT the one through which the user is scrolling).
 * Assumes that it previously WAS the active menu.
 */
function inactivatePlayerControls() {
    //console.log("Inactivating player controls.");
    var ctrldiv = dojo.byId(config.IDs.player.ctrl_div);
    dojo.addClass(ctrldiv, config.classes.inactive);
    setMovieTitleAndDescr("", "");
    var pauseButton = dojo.byId(config.IDs.controls.pause);
    pauseButton.innerHTML = "Pause";
}

/*
 * Checks whether or not the list of movie choices is the
 * active menu (the one through which the user is scrolling).
 */
function areMovieChoicesActive() {
    //console.log("Checking if movie choices are active.");
    var moviediv = dojo.byId(config.IDs.movielist.div);
    var foo = getCurrentMenuAndSelection();
    var retval = (foo.menu == moviediv);
    //console.log("Answer: " + retval);
    return retval;
}

/*
 * Checks whether or not the player control menu is the
 * active menu (the one through which the user is scrolling).
 */
function arePlayerControlsActive() {
    //console.log("Checking if player controls are active.");
    var playerctrls = dojo.byId(config.IDs.player.ctrl_div);
    var foo = getCurrentMenuAndSelection();
    var retval = (foo.menu == playerctrls);
    //console.log("Answer: " + retval);
    return retval;
}



/*
 * Puts the title and description text for a video in the appropriate
 * part of the page.
 */
function setMovieTitleAndDescr(title, descr) {
    var title_div = dojo.byId(config.IDs.movie.title);
    var descr_div = dojo.byId(config.IDs.movie.description);
    title_div.innerHTML = title;
    descr_div.innerHTML = descr.replace(/\n/g, "<br />");
}


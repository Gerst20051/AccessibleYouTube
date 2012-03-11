/*
 * Selects the default movie choice.
 * Generally, the cleanest way to move the chooser to the
 * list of movie choices is by calling this function.
 */
function selectDefaultMovieChoice() {
    //console.log("Selecting default movie choice.");
    var movielist = dojo.byId(config.IDs.movielist.div);
    var prevPlaying = dojo.query("." + config.classes.nowplaying + "." + config.classes.choice + "." + config.classes.movie + "." + config.classes.shown, movielist);
    if (prevPlaying.length > 0) {
        //console.log("Found one that had been playing; selecting it.");
        dojo.removeClass(prevPlaying[0], config.classes.nowplaying);
        selectNode(prevPlaying[0]);
    }
    else {
        //console.log("None found that had been playing; selecting first one.");
        var poss = dojo.query("." + config.classes.choice + "." + config.classes.movie + "." + config.classes.shown, movielist);
        if (poss.length > 0) {
            selectNode(poss[0]);
            //console.log("First movie choice selected.");
        }
        else {
            console.log("Error: no movies to choose from!");
        }
    }
}

/*
 * This is the onselect function for the movies in the list of movies.
 */
function afterSelectingAMovie(curr) {
    //console.log("You've selected a movie.");
    //var movieURL = dojo.attr(curr, config.attrs.movie_url);
    var movieURL = dojo.query("."+config.classes.movie_url, curr)[0].innerHTML;
    var ytplayer = getYTPlayer();
    //ytplayer.stopVideo();
    ytplayer.clearVideo();
    console.log('cue', movieURL);
    ytplayer.cueVideoByUrl(movieURL, 0);
}

/*
 * This is the onselect function for the scrolling arrows in the list
 * of movies.
 */
function afterSelectingAnArrow(curr) {
    //console.log("Arrow selected.");
    //console.log("I'm about to try to clear the player display...");
    var ytplayer = getYTPlayer();
    ytplayer.stopVideo();
    ytplayer.clearVideo();
    ytplayer.cueVideoById("", 0);
}

/*
 * This is the onselect function for the back button in the list of movies.
 */
function afterSelectingBackButton(curr) {
    //console.log("Back button selected.");
    //console.log("I'm about to try to clear the player display...");
    var ytplayer = getYTPlayer();
    ytplayer.stopVideo();
    ytplayer.clearVideo();
    ytplayer.cueVideoById("", 0);
}

/*
 * This is the onchoose function for the back button in the list of movies.
 * It uses the browser's history to go to the previous page.
 */
function goBack(node) {
    history.go(-1);
}

/*
 * This is the onchoose function for the movies in the list of movies.
 * It loads the selected movie on the player, starts playing, and moves
 * the chooser to the player controls.
 */
function playCurrentMovie(selected) {
    var moviediv = dojo.byId(config.IDs.movielist.div);
    var poss = dojo.query("." + config.classes.nowplaying, moviediv);
    var oldMovie = null;
    if (poss.length > 0) {
        oldMovie = poss[0];
    }
    if (oldMovie == selected) {
        console.log("Selected movie is already playing.");
    }
    else {
        if (oldMovie != null)
        {
            dojo.removeClass(oldMovie, config.classes.nowplaying);
        }
        dojo.addClass(selected, config.classes.nowplaying);
        var movieURL = dojo.query("."+config.classes.movie_url, selected)[0].innerHTML;
        movieURL = movieURL.replace('&amp;', '&');
        movieURL = movieURL.replace(/\s+/g, '');
        var movietitle = dojo.query("."+config.classes.movie_title, selected)[0].innerHTML;
        var moviedescr = dojo.query("."+config.classes.movie_description, selected)[0].innerHTML;
        setMovieTitleAndDescr(movietitle, moviedescr);
        var ytplayer = getYTPlayer();
        //ytplayer.stopVideo();
        ytplayer.clearVideo();
        console.log('load', movieURL);
        ytplayer.loadVideoByUrl(movieURL, 0);
        selectDefaultPlayerControl();
    }
}


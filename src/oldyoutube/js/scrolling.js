// const DEFAULT_MAX_MOVIES = 6;

/*
 * Updates the currently visible movies to only those that can fit
 * on the screen, starting at startIndex and increasing the index
 * by direction from each movie to the next.
 */
function scroll(startIndex, direction) {
    console.log("Scrolling. starting with node "+startIndex+" and going in the "+direction+" direction.");
    hideAllScrollables();
    var maxNodes = getMaxMovies();
    var moviediv = dojo.byId(config.IDs.movielist.div);
    var movielist = dojo.query("." + config.classes.scrollable, moviediv);
    var index = startIndex;
    var lbound = rbound = index;
    for (var i=0; i<maxNodes; ++i) {
        //var index = startIndex + i*direction;
        if (0 <= index && index < movielist.length) {
            var node = movielist[index];
            showChoice(node);
            if (index < lbound) {
                lbound = index;
            }
            if (index > rbound) {
                rbound = index;
            }
        }
        index += direction;
    }
    console.log("Nodes shown: from "+lbound+" to "+rbound+" (inclusive).");
    adjustScrollArrows(lbound, rbound, movielist.length);
}

/*
 * Makes visible the movies immediately to the left of those currently
 * visible.
 */
function scrollLeft(node) {
    var moviediv = dojo.byId(config.IDs.movielist.div);
    var allscrollables = dojo.query("." + config.classes.scrollable, moviediv);
    var shownscrollables = dojo.query("." + config.classes.scrollable + "." + config.classes.shown, moviediv);
    var startIndex = 0;
    if (shownscrollables.length > 0) {
        var firstShown = shownscrollables[0];
        startIndex = allscrollables.indexOf(firstShown) - 1;
    }
    var direction = -1;
    scroll(startIndex, direction);
    var choices = dojo.query("." + config.classes.choice + "." + config.classes.shown, moviediv);
    var first = choices[0];
    selectNode(first);
}

/*
 * Makes visible the movies immediately to the right of those currently
 * visible.
 */
function scrollRight(node) {
    var moviediv = dojo.byId(config.IDs.movielist.div);
    var allscrollables = dojo.query("." + config.classes.scrollable, moviediv);
    var shownscrollables = dojo.query("." + config.classes.scrollable + "." + config.classes.shown, moviediv);
    var startIndex = 0;
    if (shownscrollables.length > 0) {
        var lastShown = shownscrollables[shownscrollables.length-1];
        startIndex = allscrollables.indexOf(lastShown) + 1;
    }
    var direction = 1;
    scroll(startIndex, direction);
    var choices = dojo.query("." + config.classes.choice + "." + config.classes.shown, moviediv);
    var last = choices[choices.length-1];
    selectNode(last);
}

/*
 * Greys or hides the scrolling arrows if they cannot be used
 * (if there are no more movies in one direction or the other).
 */
function adjustScrollArrows(lbound, rbound, totmovies) {
    console.log("Adjusting scroll arrows. Currently viewing nodes "
     + lbound + " through " + rbound + " of " + totmovies);
    var lArrow = dojo.byId(config.IDs.movielist.l_arrow);
    var rArrow = dojo.byId(config.IDs.movielist.r_arrow);
    var bButton = dojo.byId(config.IDs.movielist.back_button);
    if (lbound != 0) {
        hideChoice(bButton);
        // Which of these two does the right thing depends on whether
        // the back button is enabled. But it's simpler to just do both
        // than to have an if-else.
        ungreyChoice(lArrow);
        showChoice(lArrow);
    }
    else if (!config.settings.disable_browsing) {
        hideChoice(lArrow);
        showChoice(bButton);
    }
    else {
        hideChoice(bButton);
        greyChoice(lArrow);
    }
    if (rbound+1 == totmovies) {
        greyChoice(rArrow);
    }
    else {
        ungreyChoice(rArrow);
    }
}



/*
 * Calculates the maximum number of movies that can be fit across
 * the screen.
 * Assumptions made:
 * Movies are CURRENTLY HIDDEN, so the actual_movie_list.offsetWidth
 * represents the actual amount of space we have
 * Each movie choice div is exactly IMG_WIDTH pixels wide
 * with a 5 pixel border
 * and one extra pixel on each side (padding or some such).
 */
function getMaxMovies() {
    //console.log("Calculating max number of movies that will fit");
    var page = dojo.byId(config.IDs.entire_page);
    var moviediv = dojo.byId(config.IDs.movielist.div);
    var navnodes = moviediv.childNodes[1];
    //console.debug(navnodes);
    var pagewidth = page.offsetWidth;
    var unavailwidth = navnodes.offsetWidth;
    //console.log("The page's width: " + pagewidth);
    //console.log("The movie div's width: " + divwidth);
    //console.log("The movie list's width: " + moviewidth);
    //console.log("Width unavailable: " + unavailwidth);
    var totWidth = pagewidth - unavailwidth;
    var movieWidth = IMG_WIDTH;
    movieWidth += 2*(5+1);
    var maxMovies = totWidth / movieWidth;
    //console.log("Max movies: " + maxMovies);
    return parseInt(maxMovies);
}

/*
 * Hides all nodes that can be scrolled through. Should be called before
 * calling getMaxMovies.
 */
function hideAllScrollables() {
    var moviediv = dojo.byId(config.IDs.movielist.div);
    var movielist = dojo.query("." + config.classes.scrollable, moviediv);
    for (var i=0; i<movielist.length; ++i) {
        var choice = movielist[i];
        hideChoice(choice);
    }
}

/*
 * Makes the indicated node visible.
 */
function showChoice(node) {
    dojo.removeClass(node, config.classes.not_shown);
    dojo.addClass(node, config.classes.shown);
    node.parentNode.style.display = "";
}

/*
 * Makes the indicated node invisible.
 */
function hideChoice(node) {
    dojo.removeClass(node, config.classes.shown);
    dojo.addClass(node, config.classes.not_shown);
    node.parentNode.style.display = "none";
}

/*
 * Un-greys-over the indicated node.
 */
function ungreyChoice(node) {
    dojo.removeClass(node, config.classes.not_shown);
    dojo.addClass(node, config.classes.shown);
    // ungray the arrow
    dojo.removeClass(node, config.classes.inactive);
}

/*
 * Greys over the indicated node.
 */
function greyChoice(node) {
    dojo.removeClass(node, config.classes.shown);
    dojo.addClass(node, config.classes.not_shown);
    // gray the arrow
    dojo.addClass(node, config.classes.inactive);
}



/*
 * Searches for YouTube videos matching the search terms specified
 * in args.q.
 * Puts the resulting list of videos in the movie list on the page.
 * You can also specify other arguments, like 'start-index' or
 * 'max-results', in args.
 * For more information on those parameters, consult the YouTube
 * data API.
 */
function YTVideoSearch(args) {
    url = "http://gdata.youtube.com/feeds/api/videos";
    retrieveFeed(url, putFeedAsMovieList, args);
}

/*
 * Gets a list of videos in the playlist with the specified ID.
 * Puts the resulting list of videos in the movie list on the page.
 * You can also specify other arguments, like 'start-index' or
 * 'max-results', in args.
 * For more information on those parameters, consult the YouTube
 * data API.
 */
function YTPlaylistRetrieval(playlistID, args) {
    url = "http://gdata.youtube.com/feeds/api/playlists/" + playlistID;
    retrieveFeed(url, putFeedAsMovieList, args);
}

/*
 * Gets a list of videos from one of YouTube's standard feeds.
 * Puts the resulting list of videos in the movie list on the page.
 * You can also specify other arguments, like 'start-index' or
 * 'max-results', in args.
 * For more information on those parameters and what the standard
 * feeds are, consult the YouTube data API.
 */
function YTStdFeedRetrieval(feedID, args) {
    url = "http://gdata.youtube.com/feeds/api/standardfeeds/" + feedID;
    retrieveFeed(url, putFeedAsMovieList, args);
}

/*
 * Gets a list of related videos for the video with the specified ID.
 * Puts the resulting list of videos in the movie list on the page.
 * You can also specify other arguments, like 'start-index' or
 * 'max-results', in args.
 * For more information on those parameters, consult the YouTube data API.
 */
function YTRelatedRetrieval(videoID, args) {
    url = "http://gdata.youtube.com/feeds/api/videos/" + videoID + "/related";
    retrieveFeed(url, putFeedAsMovieList, args);
}
 
/*
 * Gets a list of videos from YouTube (based on the given URL).
 * Puts the resulting list of videos in the movie list on the page.
 * You can specify other arguments, like 'start-index' or
 * 'max-results', in args.
 * For more information on those parameters, consult the YouTube data API.
 */
function retrieveFeed(url, callbackFunc, args) {
    disableUI();
    //console.log("Get feed from:");
    //console.log(url);
    args.alt = "json-in-script";
    dojo.io.script.get({
        url: url,
        callbackParamName: "callback",
        content: args,
        load: callbackFunc
    });
}


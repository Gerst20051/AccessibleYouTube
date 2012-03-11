const IMG_WIDTH = 130;
const TITLE_HEIGHT = 40;



/*
 * Takes the data YouTube sends back when you request a feed of
 * videos and processes it into something that Accessible YouTube
 * can use. Puts that list of videos into the movie list on the
 * player page.
 * This function serves as the callback for the YT__Retrieval
 * functions.
 */
function putFeedAsMovieList(data) {
    //console.debug(data);
    var entries = data.feed.entry;
    //console.debug(entries);
    var moviediv = dojo.byId(config.IDs.movielist.div);
    var movielist = dojo.query("#" + config.IDs.movielist.actual_list, moviediv)[0];
    var fullhtml = "";
    var numErrors = 0;
    for (var i=0; i<=entries.length; ++i)
    {
        try
        {
            // I may be technically violating JS coding conventions here, but
            // it makes the generated string MUCH easier to understand :)
            var html = "";
            html += "<td";
                html += " style='";
                    html += "padding: 0px;";
                    //html += " vertical-align: bottom;";
                    html += "'";
                html += ">";
                html += "<div";
                    html += " style='";
                        html += "width: ";
                            html += IMG_WIDTH;
                            html += "px;";
                    html += "'";
                    html += " class='" + config.classes.choice;
                        html += " " + config.classes.movie;
                        html += " " + config.classes.scrollable;
                        html += " " + config.classes.always_clickable + "'";
                    html += "'";
                    html += " onmouseover='selectNodeIfApplicable(this);'";
                    html += " onclick='chooseNodeIfApplicable(this);'";
                    html += " " + config.attrs.onselect_func;
                        html += "='afterSelectingAMovie'";
                    html += " " + config.attrs.onchoose_func;
                        html += "='playCurrentMovie'";
                html += "> ";
                    html += "<img";
                        html += " src='";
                            html += entries[i].media$group.media$thumbnail[0].url;
                        html += "'";
                        html += " width='";
                            html += IMG_WIDTH;
                        html += "'";
                    html += "> ";
                    html += "<p";
                        html += " class='";
                            html += config.classes.movie_title;
                            html += " " + config.classes.tts_info;
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
                        html += entries[i].title.$t;
                    html += " </p>";
                    html += "<p";
                        html += " class='";
                            html += config.classes.movie_description;
                            html += "'";
                        html += " style='";
                            html += "display:none;";
                            html += "'";
                    html += "> ";
                        html += entries[i].content.$t;
                    html += " </p>";
                    html += "<p";
                        html += " class='";
                            html += config.classes.movie_url;
                            html += "'";
                        html += " style='";
                            html += "display:none;";
                            html += "'";
                    html += "> ";
                        html += entries[i].media$group.media$content[0].url;
                    html += " </p>";

                html += " </div>";
            html += " </td>";
            // console.log(html);
            fullhtml += html;
        }
        catch (e)
        {
            numErrors += 1;
        }
    }
    if (numErrors > 0)
    {
        if (numErrors == 1)
        {
            console.log("There was an error loading 1 of the videos.");
            console.log("It has been skipped.");
            console.log("Embedding may be disabled for that video.");
        }
        else
        {
            console.log("There were errors loading " + numErrors
             + " of the videos.");
            console.log("They have been skipped.");
            console.log("Embedding may be disabled for those videos.");
        }
    }
    movielist.innerHTML = fullhtml;
    scroll(0, 1);
    selectDefaultMovieChoice();
    enableUI();
    return data;
}


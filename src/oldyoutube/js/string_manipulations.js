/*
 * Turns the "?this=something&that=somethingelse"
 * at the end of the URL into an associative array.
 */
function parseArgs(url) {
    var foo = url.split("?")[1];
    args = {};
    var parts = foo.split("&");
    for (var i in parts)
    {
        var key, value;
        [key, value] = parts[i].split("=");
        args[key] = value;
    }
    return args;
}


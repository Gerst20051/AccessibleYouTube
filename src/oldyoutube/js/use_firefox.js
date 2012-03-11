dojo.addOnLoad(checkForFirefox);

/*
 * If the user's browser is not Firefox, redirects them to the page
 * that says "Hey, use firefox".
 */
function checkForFirefox() {
    if (!dojo.isFF) {
        // Not clear whether it makes a difference whether I do this
        // or use window.location.href ...
        window.location = "usefirefox.html";
    }
}


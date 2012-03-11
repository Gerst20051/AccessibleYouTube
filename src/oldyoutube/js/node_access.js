/*
 * Gets the menu node that contains the given choice node.
 */
function getMenuOf(node) {
    //console.log("Finding menu containing the node:");
    //console.debug(node);
    var allmenus = dojo.query("." + config.classes.menu);
    //console.log("List of all menus:");
    //console.debug(allmenus);
    for (var i=0; i<allmenus.length; ++i) {
        //console.log("Checking:");
        //console.debug(allmenus[i]);
        if (isNodeInside(node, allmenus[i])) {
            //console.log("Found it! Returning.");
            return allmenus[i];
        }
    }
    console.log("Error: No menu found for node " + node);
    return null;
}

/*
 * Returns the currently selected node and active menu.
 */
function getCurrentMenuAndSelection() {
    var retval = {menu:null, selected:null};
    var selected = dojo.query("." + config.classes.selected);
    if (selected.length > 0) {
        retval.selected = selected[0];
        retval.menu = getMenuOf(retval.selected);
    }
    return retval;
}



/*
 * Returns a pointer to the actual YouTube player object.
 * For consistency, use of this function should probably be
 * discontinued (no similar functions exist for the movie div
 * or the player control div, or any other part of the page.)
 */
function getYTPlayer() {
    return dojo.byId(config.IDs.player.player);
}


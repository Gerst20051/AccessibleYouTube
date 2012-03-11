/*
 * It's tempting to merge this with node_access.js.
 * The only reason I haven't already is because of length.
 */

/*
 * Moves the currently selected node to the next one in the active menu,
 * wrapping around if necessary.
 */
function cycleSelected() {
    //console.log("cycling selected node");
    var foo = getCurrentMenuAndSelection();
    var menu = foo.menu;
    var curr = foo.selected;
    var choicelist = dojo.query("." + config.classes.choice + "." + config.classes.shown, menu);
    if (choicelist.length == 0) {
        choicelist = dojo.query("." + config.classes.choice, menu);
    }
    var currindx = choicelist.indexOf(curr);
    var nextindx = currindx + 1;
    if (nextindx >= choicelist.length)
    {
        nextindx -= choicelist.length;
    }
    var next = choicelist[nextindx];
    selectNode(next);
}

/*
 * Chooses the currently selected node.
 * (Calls the chooseNode function on it.)
 */
function chooseSelected() {
    //console.log("choosing selected");
    var foo = getCurrentMenuAndSelection();
    var menu = foo.menu;
    var curr = foo.selected;
    //console.debug(curr);
    chooseNode(curr);
}

/*
 * Checks whether the node can be selected or chosen.
 * If this function returns false, the node is not available for use.
 * However, if this function returns true, it does not necessarily
 * mean that the node is usable.
 */
function isNodeUsable(node) {
    if (!UIenabled) {
        return false;
    }
    if (dojo.hasClass(node, config.classes.notshown)) {
        return false;
    }
    if (dojo.hasClass(node, config.classes.inactive)) {
        return false;
    }
    return true;
}

/*
 * Checks if the given node is selectable. If so, selects it.
 */
function selectNodeIfApplicable(node) {
    if (!isNodeUsable(node)) {
        return false;
    }
    var foo = getCurrentMenuAndSelection();
    if (!(isNodeInside(node, foo.menu))) {
        return false;
    }
    selectNode(node);
    return true;
}

/*
 * Checks if the given node is choosable. If so, chooses it.
 */
function chooseNodeIfApplicable(node) {
    if (!isNodeUsable(node)) {
        return false;
    }
    var foo = getCurrentMenuAndSelection();
    // The always_clickable class signifies that even if the given
    // node is not in the active menu, it may be chosen (presumably
    // by mouse, since it cannot be selected without activating its
    // menu).
    var override = dojo.hasClass(node, config.classes.always_clickable);
    if (!(override || isNodeInside(node, foo.menu)))
    {
        return false;
    }
    chooseNode(node);
    return true;
}

/*
 * Checks if "inner" lies anywhere inside "outer".
 */
function isNodeInside(inner, outer) {
    if (inner == outer)
    {
        return true;
    }
    else if (inner == null)
    {
        return false;
    }
    else
    {
        return isNodeInside(inner.parentNode, outer);
    }
}

/*
 * Function to switch active menus.
 * Inactivates the current menu and activates the new one.
 */
function moveToMenu(node) {
    var foo = getCurrentMenuAndSelection();
    var inactivate = dojo.attr(foo.menu, config.attrs.oninactivate_func);
    if (inactivate != null) {
        eval(inactivate + "()");
    }
    var activate = dojo.attr(node, config.attrs.onactivate_func);
    if (activate != null) {
        eval(activate + "()");
    }
}

/*
 * Selects the given node.
 * Deselects the old selected node, if applicable.
 * Switches menus, if applicable.
 * Once finished, calls the node's onselect function
 * and reads the node's text-to-speech information, if any.
 */
function selectNode(node) {
    console.log("Selecting node:");
    console.debug(node);
    
    // Figure out where the old and new selections (and their menus) are
    //console.log("Figuring out where the old and new selections are");
    var oldMS = getCurrentMenuAndSelection();
    var newMS = {menu:getMenuOf(node), selected:node};
    
    // If the new node and the old node are the same, then do nothing
    if (oldMS.selected == newMS.selected) {
        return false;
    }
    
    // If applicable, deselect old node.
    //console.log("Deselecting old node.");
    if (oldMS.selected != null) {
        dojo.removeClass(oldMS.selected, config.classes.selected);
    }
    
    // If switching menus, inactivate the old one and activate the new one.
    if (oldMS.menu != newMS.menu) {
        // If there is an old menu and it has an oninactivate function,
        // call it.
        //console.log("Inactivating old menu");
        if (oldMS.menu != null) {
            var inactivate = dojo.attr(oldMS.menu, config.attrs.oninactivate_func);
            if (inactivate != null) {
                eval(inactivate + "()");
            }
        }
        
        // If the new menu has an onactivate function, call it.
        var activate = dojo.attr(newMS.menu, config.attrs.onactivate_func);
        if (activate != null) {
            eval(activate + "()");
        }
    }
    
    // Select new node.
    //console.log("Selecting new node.");
    dojo.addClass(newMS.selected, config.classes.selected);
    
    // If applicable, call the onselect function for the new node.
    //console.log("Calling new node's onselect function.");
    var onselect = dojo.attr(newMS.selected, config.attrs.onselect_func);
    if (onselect != null)
    {
        eval(onselect + "(newMS.selected)");
    }
    
    // Look for any text-to-speech information to speak.
    //console.log("Looking for TTS info.");
    var tts_info_nodes = dojo.query("." + config.classes.tts_info, newMS.selected);
    //console.log("TTS info found in the following nodes:");
    console.debug(tts_info_nodes);
    if (tts_info_nodes.length > 0) {
        var tts_info = tts_info_nodes[0];
        var text = tts_info.innerHTML;
        //console.log("Engaging text-to-speech");
        textToSpeech(text);
    }
    else {
        console.log("No TTS info found; not speaking.");
    }
    
    return true;
}

/*
 * Chooses the given node.
 * (Calls its onchoose function.)
 */
function chooseNode(node) {
    var funcname = dojo.attr(node, config.attrs.onchoose_func);
    console.log(funcname);
    eval(funcname + "(node)");
}

/*
 * Selects the first choice in the given menu.
 */
function selectFirstChoiceInMenu(menu) {
    console.log("Selecting first choice in the menu:");
    console.debug(menu);
    var poss = dojo.query("." + config.classes.choice, menu);
    if (poss.length > 0) {
        selectNode(poss[0]);
    }
    else {
        console.log("Error: no choices to select.");
    }
}



var UIenabled = true;

var keyDownConnectionHandle = null;
var keyUpConnectionHandle = null;

/*
 * Connects the handlers for keyup and keydown events to the events.
 */
function connectKeys() {
    keyDownConnectionHandle = dojo.connect(document, "onkeydown", handleKeyDown);
    keyUpConnectionHandle = dojo.connect(document, "onkeyup", handleKeyUp);
}

/*
 * Disconnects the handlers for keyup and keydown events from the events.
 */
function disconnectKeys() {
    dojo.disconnect(keyDownConnectionHandle);
    dojo.disconnect(keyUpConnectionHandle);
    var keyDownConnectionHandle = null;
    var keyUpConnectionHandle = null;
}

/*
 * Enables the user interface.
 */
function enableUI() {
    connectKeys();
    UIenabled = true;
    dojo.unblock(config.IDs.entire_page);
}

/*
 * Disables the user interface. Used to prevent the user from trying
 * to do stuff they shouldn't do while things are still loading.
 */
function disableUI() {
    dojo.block(config.IDs.entire_page);
    UIenabled = false;
    disconnectKeys();
}



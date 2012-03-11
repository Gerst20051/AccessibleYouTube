var keysHeldDown = [];

/*
 * Handles a keydown event.
 * If the key was already down (i.e., the event arose because of
 * autorepeat settings), ignores the event.
 * Either way, passes it onto keyPressed, along with information
 * on whether it should be ignored or not.
 */
function handleKeyDown(event) {
    //console.log("Key Down!");
    //console.log("keyCode: "+event.keyCode + ", charCode: "+event.charCode);
    var curr = [event.keyCode, event.charCode];
    var ignore = false;
    for (var i=0; i < keysHeldDown.length; ++i) {
        if (keyMatches(keysHeldDown[i], curr)) {
            ignore = true;
        }
    }
    if (!ignore) {
        keyPressed(event, true);
        keysHeldDown.push(curr);
    }
    else {
        keyPressed(event, false);
        //event.preventDefault();
    }
    //console.log("Keys down:");
    //console.debug(keysHeldDown);
}

/*
 * Handles a keyup event.
 * Removes the key from the list of keys being held down so that
 * when next pressed, that key will be registered.
 */
function handleKeyUp(event) {
    //console.log("Key Up!");
    //console.log("keyCode: "+event.keyCode + ", charCode: "+event.charCode);
    var curr = [event.keyCode, event.charCode];
    //var code = "[" + event.keyCode + "," + event.charCode + "]";
    var i = 0;
    while (i < keysHeldDown.length) {
        if (keyMatches(keysHeldDown[i], curr)) {
            keysHeldDown.splice(i, 1);
        }
        else {
            i += 1;
        }
    }
}

/*
 * Figures out whether the given keyevent matches either switch.
 * If so, then calls the appropriate SwitchPressed function only
 * if not told to ignore the event, but tells the browser to
 * ignore the event regardless. This means that if you hold down
 * a key which Accessible YouTube recognizes, the browser will
 * continue to ignore it even when Accessible YouTube stops
 * responding to it.
 */
function keyPressed(event, act) {
    var key = [event.keyCode, event.charCode];
    var retval = false;
    if (keyMatches(key, config.keys.Switch_1)) {
        if (act) {
            Switch1Pressed();
        }
        // Stop the browser from reacting to this keypress
        event.preventDefault();
        retval = true;
    }
    else if (keyMatches(key, config.keys.Switch_2)) {
        if (act) {
            Switch2Pressed();
        }
        // Stop the browser from reacting to this keypress
        event.preventDefault();
        retval = true;
    }
    else {
        console.log("Key pressed other than a switch");
    }
    console.debug(event);
    return retval;
}

/*
 * Checks whether the given keys match.
 * Each one should be a list of length 2 containing the keyCode
 * and charCode. In the "wanted" key, a 0 for either value will
 * match any number. Otherwise, the numbers must be the same
 * for "wanted" and "got".
 */
function keyMatches(got, wanted) {
    for (var i=0; i<wanted.length; ++i)
    {
        var matches = true;
        for (var j=0; j<wanted[i].length; ++j)
        {
            if (!(wanted[i][j] == 0 || wanted[i][j] == got[j]))
            {
                matches = false;
            }
        }
        if (matches)
        {
            return true;
        }
    }
    return false;
}

/*
 * Dummy functions for the two switches.
 * Any actual functionality should be dojo.connected to these functions.
 */
function Switch1Pressed()
{
    console.log("Switch 1 pressed");
}
function Switch2Pressed()
{
    console.log("Switch 2 pressed");
}


/*
 * Reads settings from a cookie. Updates config.settings.
 */
function loadOptions() {
    console.log("Attempting to load options from cookie.");
    console.log(config.cookie);
    var savedsettings = null;
    try {
        savedsettings = dojox.json.ref.fromJson(dojo.cookie(config.cookie));
    } catch (e) {
        console.log("Warning: unable to load options from cookie.");
    }
    console.log("Cookie loaded:");
    console.debug(savedsettings);
    for (var i in savedsettings) {
        config.settings[i] = savedsettings[i];
    }
}

/*
 * Updates the forms in which options can be set to reflect the saved
 * settings.
 */
function updateOptionForms() {
    var forms = dojo.query("." + config.classes.option_form);
    for (var i in forms) {
        var form = forms[i]
        for (var i2 in form.elements) {
            var elem = form.elements[i2];
            var valAttr = getValueAttr(elem);
            var valName = elem.name;
            if (config.settings[valName] != undefined) {
                elem[valAttr] = config.settings[valName];
            }
        }
    }
}

/*
 * Returns the attribute of the given node that contains the value
 * of the setting it controls.
 * For example, a checkbox stores a boolean value in the "checked"
 * attribute.
 * If form elements other than the ones named below are added to
 * the options page, this function will have to be changed to
 * reflect the attributes in which their values are stored.
 */
function getValueAttr(node) {
    if (node.type == "checkbox") {
        return "checked";
    }
    else if (node.type == "text") {
        return "value";
    }
}

/*
 * Automatically load info from the cookie at loadtime
 */
dojo.addOnLoad(function() {
    dojo.require("dojo.cookie");
    dojo.require("dojox.json.ref");
    loadOptions();
    updateOptionForms();
});




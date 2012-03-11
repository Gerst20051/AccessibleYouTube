// This is to prevent crashes in browsers without Firebug
if (typeof(console)=="undefined")
{
    console = {log: function(x) {}, debug: function(x) {}};
}



dojo.addOnLoad(function() {
    console.log("Main script called.");
    dojo.require("dojo.io.script");
});

dojo.addOnLoad(createAndSetupPlayer);



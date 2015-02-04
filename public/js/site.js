function playSound(soundName) {
    var thissound = document.getElementById(soundName);
    thissound.play();

    $.ajax({
        type: 'POST',
        url: '/api/played/' + soundName,
        dataType: 'json',
        success: function(data) {
            if (data.noOfPlays === 1) {
                $("#noOfPlays" + soundName).html("Plays: 1");
            } else {
                $("#noOfPlays" + soundName).html("Plays: " + data.noOfPlays);
            }
            console.log(data);
        },
        error: function(e) {
            console.log("Errors when playing '" + soundName + "':");
            console.log(e);
        }
    });
};

var client = new ZeroClipboard(document.getElementById("copy-button"));

client.on("ready", function(readyEvent) {
    // alert( "ZeroClipboard SWF is ready!" );

    client.on("aftercopy", function(event) {
        // `this` === `client`
        // `event.target` === the element that was clicked
        // event.target.style.display = "none";
        // alert("Copied text to clipboard: " + event.data["text/plain"]);
    });
});
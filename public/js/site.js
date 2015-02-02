function playSound(soundName) {
    var thissound = document.getElementById(soundName);
    thissound.play();
    $.ajax({
        type: 'POST',
        url: '/api/played/' + soundName,
        success: function() {
            console.log("Sound '" + soundName + "' played")
        },
        error: function(e) {
            console.log("Errors when played '" + soundName + "'");
            console.log(e);
        }
    });
};
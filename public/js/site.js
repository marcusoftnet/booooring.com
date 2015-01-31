function playSound(soundName) {
    var thissound = document.getElementById(soundName);
    thissound.play();
    $.ajax({
        type: 'POST',
        url: '/api/played/' + soundName,
        success: function() {
            console.log("Sound played")
        },
        error: function(e) {
            console.log("Errors when logging played");
            console.log(e);
        }
    });
};
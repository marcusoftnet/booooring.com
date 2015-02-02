function playSound(soundName) {
    var thissound = document.getElementById(soundName);
    thissound.play();

    $.ajax({
        type: 'POST',
        url: '/api/played/' + soundName,
        dataType : 'json',
        success: function(data) {
            if(data.noOfPlays === 1){
                $("#noOfPlays"+soundName).html("Sound played 1 time");
            }else{
                $("#noOfPlays"+soundName).html("Sound played " + data.noOfPlays + " times");
            }
            console.log(data);
        },
        error: function(e) {
            console.log("Errors when played '" + soundName + "'");
            console.log(e);
        }
    });
};
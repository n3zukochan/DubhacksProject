
//js linked to dubhackP.html

$(document).ready(function() {

    //play instruction, play categories
    //wait for user to pick categories using annyang
    //if(we have that categories) {
        call fetchCategory(categories);
    }
});

    function fetchCategory(category) {
        var URL = "?=" + category;  
        $.ajax({
            url: URL,
            type: 'GET',
            complete: function(audio) {
                processAudio(data.responseText);
            }
        })

    };

    function processAudio(allAudios) {

    };


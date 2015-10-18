//js linked to dubhackP.html

$(document).ready(function() {

    var yes = false;
    var no = false;

    if (annyang) {
        console.log("checking");
        // Let's define our first command. First the text we expect, and then the function it should call
        var commands = {
            // 'show me :category': fetchCategory,
            "get :category": fetchCategory,
            "play :article" : playArticle,
            "next :article" : playTitle
        };

        annyang.addCommands(commands);

        annyang.debug();
        annyang.start();

        //welcome
        var audio = new Audio('http://ec2-52-89-34-199.us-west-2.compute.amazonaws.com/audio/welcome.mp3');
        audio.play();
        // sleep(700000);
    }



    //play instruction, play categories
   //wait for user to pick categories using annyang
   //if(we have that categories) {
   //fetchCategory("sports");


    // fetchCategory("sports");


    var listOfAudios = [];
    var index = -1;

    function fetchCategory(category) {
       var URL = "http://ec2-52-89-34-199.us-west-2.compute.amazonaws.com/webservice_final.php?category='" + category + "'";
       $.ajax({
           url: URL,
           type: 'get',
           complete: function(audio) {
               console.log(audio.responseText)
               processAudio(audio.responseText);
           }
       });
    }

    function processAudio(audio) {
        var audio = JSON.parse(audio);
        for (var i = 0; i < audio.length; i++) {
            listOfAudios[i] = audio[i];
        }

        // sleep(3000);
        playTitle();
    }

    function sleep(miliseconds) {
           var currentTime = new Date().getTime();

           while (currentTime + miliseconds >= new Date().getTime()) {
           }
    }

    function playTitle(cat) {
        //give instructiona
        console.log(index);
        // annyang.pause(); //?
        index++;
        if(index < listOfAudios.length) {
            var titlename = listOfAudios[index].titlename;
            var audio = new Audio('http://ec2-52-89-34-199.us-west-2.compute.amazonaws.com/audio/' + titlename);
            audio.play();
            //Prompt user to make a choice
            annyang.start();
        }
    }

    function playArticle() {
        var articlename = listOfAudios[index].articlename;
        var audio = new Audio('http://ec2-52-89-34-199.us-west-2.compute.amazonaws.com/audio/' + articlename);
        audio.play();
        //if they say stop? what we do? --> start over again? or go back to titles.
        //prompt for another article, rate, never ask me to rate this agian?
        // playTitle();
    }



});

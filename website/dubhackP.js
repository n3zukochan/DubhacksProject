//js linked to dubhackP.html

$(document).ready(function() {

    if (annyang) {
        console.log("checking");
      // Let's define our first command. First the text we expect, and then the function it should call
      var commands = {
        // 'show me :category': fetchCategory,
        "show me :category": fetchCategory,
        "play :article" : playArticle,
        "next :article" : playTitle
      };

      annyang.addCommands(commands);

      annyang.start();

    }

    //play instruction, play categories
   //wait for user to pick categories using annyang
   //if(we have that categories) {
   //fetchCategory("sports");
    var listOfAudios = [];
    var index = -1;

   function fetchCategory(category) {
       var URL = "http://ec2-52-89-34-199.us-west-2.compute.amazonaws.com/webservice_final.php?category='sports'";
       $.ajax({
           url: URL,
           type: 'get',
           complete: function(audio) {
               processAudio(audio.responseText);
           }
       })

   }

    function processAudio(audio) {
        var audio = JSON.parse(audio);
        for (var i = 0; i < audio.length; i++) {
            listOfAudios[i] = audio[i];
        }
        playTitle();
    });

    function playTitle() {
        //give instructiona
        annyang.pause(); //?
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
        playTitle();
    }

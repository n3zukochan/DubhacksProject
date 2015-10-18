//js linked to dubhackP.html

$(document).ready(function() {

    // var yes = false;
    // var no = false;
    var listOfAudios = [];
    var index = -1;
    var masterArticle = new Howl({
        urls: [],
        onpause: function() {
            //do you want to go back? to go back, say "go back"
            //do you want to listen to the categories again, say "go to categories"
            pausePrompt();
        },
        onend: function() {
            endPrompt();
        }

    });

    //play welcome.mp3
    // var masterPrompt = new Howl({
    //     urls: ["http://ec2-52-89-34-199.us-west-2.compute.amazonaws.com/audio/welcome.mp3"],
    //     onend: function() {
    //         categoriesprompt();
    //     }
    // });
    // masterPrompt.play();
    // categoriesprompt(); // test
    // sleep(7000); //12000

    //play cateforiesprompt.mp3.
    //wait for user to say "get category". then it will go to fetchCategory
   //  promptPlayAgian()
   // // sleep(30000); //20000
   //  playAgian();

    if (annyang) {
        console.log("checking");
        // Let's define our first command. First the text we expect, and then the function it should call
        var commands = {
            // 'show me :category': fetchCategory,
            "get :category": fetchCategory,
            "play :article" : playArticle,
            "next :title" : playTitle, //read the next title
            "go back" : function() {
                index = -1;
                playTitle(); //when you are on article, goes back to titles.
            },
            "go to categories": function() {
                categoriesprompt();
            },
            "pause" : function() {
                masterArticle.pause();
            },
            "resume :article" : function() {
                masterArticle.play();
            }

        };

        annyang.addCommands(commands);

        annyang.debug([newState=true]);
        annyang.start();
    }

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


        // masterPrompt.urls[0] = 'http://ec2-52-89-34-199.us-west-2.compute.amazonaws.com/audio/titleprompt';
        masterPrompt = new Howl({
            urls: ["http://ec2-52-89-34-199.us-west-2.compute.amazonaws.com/audio/titleprompt.mp3"],
            onend: function() {
                playTitle();
            }
        });


        masterPrompt.play();

        // playTitle();
    }

    function sleep(miliseconds) {
           var currentTime = new Date().getTime();

           while (currentTime + miliseconds >= new Date().getTime()) {
               console.log("sleeping");
           }
    }

    function playTitle(title) {

        console.log(index);
        index++;
        if(index < listOfAudios.length) {
            var titlename = listOfAudios[index].titlename;
            console.log(titlename);
            console.log("in here!");
            // masterPrompt.urls[0] = 'http://ec2-52-89-34-199.us-west-2.compute.amazonaws.com/audio/' + titlename;
            masterPrompt = new Howl({
                urls: ["http://ec2-52-89-34-199.us-west-2.compute.amazonaws.com/audio/" + titlename],
            });

            masterPrompt.play();
            // promptPlayAgian();


            //wait for user to respond-> 1. play article 2.next title or after 10 seconds, it will play
            //the title agian
        }
    }

    function playArticle(article) {
        var articlename = listOfAudios[index].articlename;
        console.log(articlename);
        // masterArticle.urls[0] = 'http://ec2-52-89-34-199.us-west-2.compute.amazonaws.com/audio/' + articlename;
        masterArticle = new Howl({
            urls: ["http://ec2-52-89-34-199.us-west-2.compute.amazonaws.com/audio/" + articlename],
            onpause: function() {
                //do you want to go back? to go back, say "go back"
                //do you want to listen to the categories again, say "go to categories"
                pausePrompt();
            },
            onend: function() {
                endPrompt();
            }
        });
        masterArticle.play();
    }

    //called by onend
    function endPrompt() {
        masterPrompt = new Howl({
            urls: ["http://ec2-52-89-34-199.us-west-2.compute.amazonaws.com/audio/endprompt.mp3"],
        });
        masterPrompt.play();
        // promptPlayAgian();
    }

    //called by onpause
    function pausePrompt() {
        masterPrompt = new Howl({
            urls: ["http://ec2-52-89-34-199.us-west-2.compute.amazonaws.com/audio/pauseprompt.mp3"],
        });
        masterPrompt.play();
        // promptPlayAgian();
    }

    //called by "go to categories"
    function categoriesprompt() {
        console.log("categories prompt");
        // masterPrompt.urls = ["http://ec2-52-89-34-199.us-west-2.compute.amazonaws.com/audio/categoriesprompt.mp3"];
        masterPrompt = new Howl({
            urls: ["http://ec2-52-89-34-199.us-west-2.compute.amazonaws.com/audio/categoriesprompt.mp3"],
            onend: function() {
                annyang.debug();
                annyang.start();
            }
        });
        masterPrompt.play();
        //promptPlayAgian();
    }

    // function promptPlayAgian() {
    //     setTimeout(function(){ masterPrompt().play() }, 10000);
    // }

});

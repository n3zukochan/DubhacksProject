//js linked to dubhackP.html

$(document).ready(function() {

   //play instruction, play categories
   //wait for user to pick categories using annyang
   //if(we have that categories) {
    fetchCategory("sports");

   //}
});

   function fetchCategory(category) {
       var URL = "ec2-52-89-34-199.us-west-2.compute.amazonaws.com/webservice_final.php?category=" + category;  
       $.ajax({
           url: URL,
           type: 'GET',
           complete: function(audio) {
               processAudio(audio.responseText);
           }
       })

   };

   function processAudio(audio) {
       var audio = JSON.parse(audio);
       
       var text = $("test");

       for (var i = 0; i < audio.length; i++) {
           // test.append("<li>File name: " + audio[i].filename + " Tile name:" 
           //     + audio[i].titlename + "</li>");
            console.log(audio[i]);

       }

   };


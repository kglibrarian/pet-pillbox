
$(document).ready(function(){
    

    $(".js-search").on("click", function() {
            //Prevent the default function of button
            event.preventDefault(); 
            
            //Console log that the putton was pushed
            console.log("The button was pushed!");

            //Clear out the div
            $(".drugs-appear-here").empty();

            //Create a variable called searchTerm to hold the value that the user entered into the search box
            var searchTerm = $('.js-search-term').val().trim();
            
            //Console log the searchTerm    
            console.log(searchTerm);
           
            // Construct a queryURL using the search term
                var queryURL = "https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?drug_name=" + searchTerm + "&pagesize=5&page=2" ;
    
            // Performing an AJAX request with the queryURL
            $.ajax({
                url: queryURL,
                method: "GET"
            })
                // After data comes back from the request
                .then(function(response) {
                console.log(queryURL);
                console.log(response);
                
                // storing the data from the AJAX request in the results variable
                console.log(response.data.title);
                var results = response.data;
    
                // Looping through each result item
                for (var i = 0; i < results.length; i++) {
    
                // Creating and storing a div tag
                var drugDiv = $("<div>");
                drugDiv.attr("data-id", i);

                //Create variable to hold drug title
                var drugTitle = results[i].title;

                //Create variable to hold set id
                var setID = results[i].setid;

                //Creating an add button next to each drug name
                // var addButton = $("<button class= 'add btn'>").text("+");
                var addButton = $("<button class='add btn'>").text("+").attr("id", i);
                // p.prepend(b);

                // Creating a paragraph tag with the drug name
                // var p = $("<p>").text(results[i].title);
                var title = $("<p>").text(drugTitle);

                //Creating a pargraph tag with the setID
                var titleID  = $("<p>").text(setID).attr("id",i).hide();
                
      
               // Appending the paragraph to the drugDiv
               
                drugDiv.empty().append(addButton, title, titleID);
                // drugDiv.prepend(b);
                
              // Prepending the animalDiv to the HTML page in the "#gifs-appear-here" div
              $(".drugs-appear-here").prepend(drugDiv);
                    
            };
        });  
    
        $(document).on('click', '.add', function() {
    
             //Prevent the default function of button
             event.preventDefault(); 
            
             //Console log that the add button was pushed
             console.log("The add button was pushed!");
             
            
             //Create a variable called searchTerm to hold the value that the user entered into the search box

            //  var addedDrugTerm = $(this).parent().get(0).innerText.slice(1);
              var clickedID = $(this).attr('id');
              var addedDrugTerm = $("div").find('[data-id='+ clickedID + ']');
              
             //Console log the addedDrugTerm  
             console.log("This is the added drug term: " + addedDrugTerm);
    
            //  $("<button>").addClass("delete");
            //  console.log($("<button>"));

             // Creating and storing a div tag
             var usersDrugDiv = $("<div>").addClass("usersDrugDiv");
      
            //  Creating a paragraph tag with the item the user wants to add to their list
            //  var p = $("<p>").text(addedDrugTerm);
            //  console.log(p);
             
            //  Creating a delete button next to each drug name
            //  var bb = $("<button class='delete btn'>").text("-");
             
            //  p.prepend(bb);
    
    
            // Appending the paragraph to the drugDiv
            // usersDrugDiv.prepend(bb);
            // usersDrugDiv.append(p);
            // usersDrugDiv.append(bb, addedDrugTerm)
            usersDrugDiv.append(addedDrugTerm)
            
             
           // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
           $(".user-drugs-appear-here").prepend(usersDrugDiv);
            
          
        });
        
    
    
        // function emptyDrugDiv() {
        //     $(".drugs-appear-here").empty();
        // }
    
    
    }); 
    
    $('document').on('click','.delete', function(event) {
   
        //Prevent the default function of button
        event.preventDefault(); 

       
        //Console log that the button was pushed
        console.log("The delete button was pushed!");

        // console.log(this);
        // var removeDrugTerm = $(this).parent().get(0).html();
        
        });
    

        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyDMAKT2l9OJ3XqZWcVH13y4u-A6Vk2931E",
            authDomain: "pet-pillbox.firebaseapp.com",
            databaseURL: "https://pet-pillbox.firebaseio.com",
            projectId: "pet-pillbox",
            storageBucket: "pet-pillbox.appspot.com",
            messagingSenderId: "1096759389317"
        };
        firebase.initializeApp(config);

       


    $(".js-savelist").on("click", function() {
        //Prevent the default function of button
        event.preventDefault(); 
                    
        //Console log that the putton was pushed
        console.log("The save button was pushed!");
        
        // Create a variable to reference the database.
        var database = firebase.database();
       
         //Clear out firebase
        // database.ref().remove();
        

        //save everything into variables for firebase
        // $(".usersDrugDiv").each(function(){
        
        // var drugTitle = $(this).find('p:first').text();
        // console.log(drugTitle);
        // var setID = $(this).find("p:nth-of-type(2)").text();
        // console.log(setID);
        //  var drugInfo = {
        //      drugTitle: drugTitle,
        //      setID: setID,
        //  } ;
        //  console.log (drugInfo);
        // return drugInfo;
        
        
        
        // });
        var userList=[];

        $(".usersDrugDiv").each(function(){
        
            var drugTitle = $(this).find('p:first').text();
            console.log(drugTitle);
            var setID = $(this).find("p:nth-of-type(2)").text();
            console.log(setID);
             var drugInfo = {
                 drugTitle: drugTitle,
                 setID: setID,
             } ;
             console.log (drugInfo);
            // return drugInfo;
            userList.push(drugInfo);
            console.log("This is my userList" + userList);
            
            
            });
    
            database.ref().push({ userList

            });

            $(".user-drugs-appear-here").empty();

        // function createArray(drugInfo) {
        //     var userList=[];
        //     userList.push(drugInfo);
        //     console.log("This is the user list " + userList);
        // };

        // createArray(); 

        // $(".users-drugs-appear-here").each(function(drugInfo){
        //     var userList=[];
        //     userList.push(drugInfo);
        //     console.log("This is the user list " + userList);

        // });
        
        // $(".users-drugs-appear-here").each(function(drugInfo){
            
        //     var userList=[];
        //     userList.push(drugInfo);
        //     ref.child("currentUser").push(userList);
        // }); 

    });   
});    
        
    // var dataArray = new Array();
    // $('.popupDiv').each(function(){
    //   var dataLayer = $(this).data('layer');
    //   //check if data-layer already processed
    //   if(!dataArray.indexOf(dataLayer))
    //   {
    //      //update data array
    //      dataArray.push(dataLayer);
    //      $('.popupDiv[data-layer="'+ dataLayer +'"]').each(function(){
    //         //do your stuff here
    //      });
    //   }
    // });  
        //https://stackoverflow.com/questions/26271933/jquery-how-to-loop-through-elements-with-data-attribute
        
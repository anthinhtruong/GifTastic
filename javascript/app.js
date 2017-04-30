var buttonsList = ["cats", "puppy", "octopus", "hug", "what's up"]


    // Make Button From the Button List
    // Then 
    function renderButtons() {
    	$("#buttons-display").empty();
        for (var i = 0; i < buttonsList.length; i++) {


            //add button to each items
            var buttonsOnload = $("<button>").append(buttonsList[i]);
            //add data attribute to each
            buttonsOnload.addClass("giphy");

           

            buttonsOnload.attr("data-presetlist", buttonsList[i]);
            //add to screen
            $("#buttons-display").append(buttonsOnload);



            
        }
        	$(".giphy").on("click", function() {
            giphyInfo($(this).attr("data-presetlist"));

        	})
    };



    renderButtons();



    // Attach AJAX info

    function giphyInfo(gif) {
    	$("#gif-display").empty();

        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&limit=10&rating=g&api_key=dc6zaTOxFJmzC";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            console.log(response);

            for (var i = 0; i < 10; i++) {

                var imgUrl = response.data[i].images.fixed_height_still.url;
                var rating = response.data[i].rating;

                var theGif = $("<img>").attr("src", imgUrl);

                $("img").addClass("giffy");

                 theGif.attr("data-state", "still");

                 //Still Link
             	theGif.attr("data-still", response.data[i].images.fixed_height_still.url )
             	//Animated Link
              	theGif.attr("data-animate", response.data[i].images.fixed_height.url )

                $("#gif-display").append(theGif);
                $("#gif-display").append($("<p> Rating: " + rating + "</p>"));




            }

            $(".giffy").on("click", function(){
            	alert("click")
            	var state = $(this).attr("data-state")

            	if (state === "still"){
            		$(this).attr("src", $(this).attr("data-animate"));
        			$(this).attr("data-state", "animate");

            	}
            	else {
            		$(this).attr("src", $(this).attr("data-still"));
        			$(this).attr("data-state", "still");
            	}

    		});


        })
    }

    

    //For Adding New Buttons

    $("#add-buttons").on("click", function() {

        event.preventDefault();

        var term = $("#user-input").val().trim();
        console.log(term);

        var newButton = $("<button>").append(term);

        buttonsList.push(term);
        // $("#buttons-display").append(newButton);
        renderButtons();



    });
   

/**
 * DOCUMENT IS READY
 */
$(function() {

    $( "#print-date" ).datepicker();


    // RUNS WHEN DOCUMENT IS LOADED
    //console.log("Ready!");

});

$("#subject").on("keyup", function() {
  
    var paste = $(this).val(); // Get value from pasted input
   
    if (paste.length == 0) { // If what's pasted is empty
      
       $("#message").hide(); // Don't show the error
       $("#client, #location, #product, #code").val(""); // Empty all inputs
     
    } else if (!paste.includes("~/*")) { // If what's pasted does not contain "~/*"
          
       $("#message").show().text(`This subject does not contain "~/*"`);
       $("#client, #location, #product, #code").val(""); // Empty all inputs
            
    } else { // Probably a valid subject (contains ~/*)
      
       $("#message").hide() // Hide error
      
       /** ------------------------------------------------------------
         Parse the subject, fill the other inputs
       ------------------------------------------------------------ */
      
       // Split at "-"s
       var splitPaste = paste.split("-");
 
       /**
       client: splitPaste[0]
       product: splitPaste[1]
       codes: splitPaste[2]
       */

       //OR

       /*
       client: splitPaste[0]
       location: splitPaste[1]
       product: splitPaste[2]
       codes: splitPaste[3]
       */


        if (splitPaste.length > 4) { //if the subject line includes a location, do this...

            // .NET stuff at end (~/*20104,51824,2*/~)
            // Remove spaces (just in case), "~/*", "*/~", then split at ","
            var splitCodes = splitPaste[3].replace(' ','').replace('~/*','').replace('*/~','').split(",");

            /**
             client id: splitCodes[0]
            contract: splitCodes[1]
            line: splitCodes[2]
            */

            var theClient = splitPaste[0];
            var updatedClient = removeFirstAndLastSpace(theClient);

            var theLocation = splitPaste[1];
            var updatedLocation = removeFirstAndLastSpace(theLocation);

            var theProduct = splitPaste[2];
            var updatedProduct = removeFirstAndLastSpace(theProduct);

            var theCode = splitCodes[0];
            var updatedCode = removeFirstAndLastSpace(theCode);




            // if we can't fill the data out, error:
            try {
                $("#client").val(updatedClient);
                $("#location").val(updatedLocation);
                $("#product").val(updatedProduct);
                $("#code").val(updatedCode);
            } catch (e) {
                // Something was wrong with the subject
                $("#message").show().text(`Something's wrong with this subject. Error: ` + e);
            }

        } else { //if subject line does not include a location, do this...

            // .NET stuff at end (~/*20104,51824,2*/~)
            // Remove spaces (just in case), "~/*", "*/~", then split at ","
            var splitCodes = splitPaste[2].replace(' ','').replace('~/*','').replace('*/~','').split(",");

            /**
             client id: splitCodes[0]
            contract: splitCodes[1]
            line: splitCodes[2]
            */

            var theClient = splitPaste[0];
            var updatedClient = removeFirstAndLastSpace(theClient);

            var theProduct = splitPaste[1];
            var updatedProduct = removeFirstAndLastSpace(theProduct);

            var theCode = splitCodes[0];
            var updatedCode = removeFirstAndLastSpace(theCode);



            // if we can't fill the data out, error:
            try {
                $("#client").val(updatedClient);
                $("#product").val(updatedProduct);
                $("#code").val(updatedCode);
            } catch (e) {
                // Something was wrong with the subject
                $("#message").show().text(`Something's wrong with this subject. Error: ` + e);
            }

        };

    };
   
});

function removeFirstAndLastSpace(splitItem) {
    var firstChar = splitItem.charAt(0);

    if (firstChar == " ") {
        splitItem = splitItem.slice(1);
    };

    var lastChar = splitItem.charAt(splitItem.length - 1);

    if (lastChar == " ") {
        splitItem = splitItem.slice(0, splitItem.length - 1);
    };

    return splitItem;
};

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
// function myFunction() {
//     document.getElementById("myDropdown").classList.toggle("show");
//   }
  
//   // Close the dropdown menu if the user clicks outside of it
//   window.onclick = function(event) {
//     if (!event.target.matches('.dropbtn')) {
//       var dropdowns = document.getElementsByClassName("dropdown-content");
//       var i;
//       for (i = 0; i < dropdowns.length; i++) {
//         var openDropdown = dropdowns[i];
//         if (openDropdown.classList.contains('show')) {
//           openDropdown.classList.remove('show');
//         }
//       }
//     }
//   }

/**
 * DOCUMENT IS READY
 */
 $(function() {

  // $( "#print-date" ).datepicker();

  var aaa = $("product").text();



  // RUNS WHEN DOCUMENT IS LOADED
  //console.log("Ready!");

});

$(".sel").on("change", function() {
  console.log("SOMETHING CHANGED!");
  var it = $(this).val();


  if (it == "null") {
    // make it grey
    $(this).addClass("grey-sel");

  } else {
    // make it black
    $(this).removeClass("grey-sel");
  }



//   console.log();
  

});





$(".submit").on("click", function() {

  var artistLeadVal = $("#artist-lead").val();

  var queueVal = $("#queue").val();

  var tierVal = $("#tier").val();

  var subjectVal = $("#subject").val();

  var clientVal = $("#client").val();

  var locationVal = $("#location").val();

  var productVal = $("#product").val();

  var projectTypeVal = $("#project-type").val();

  var csmVal = $("#csm").val();

  var printDateVal = $("#print-date").val();

  var groupVal = $("#group").val();

  var tagsVal = $("#tags").val();

  var codeVal = $("#code").val();

  var startOverrideVal = $("#start-override").val();

  var workOverrideVal = $("#work-override").val();

  var write = [[""]];

  write.push([artistLeadVal], [queueVal], [tierVal], [subjectVal], [clientVal], [locationVal], [productVal], [projectTypeVal], [csmVal], [""], [printDateVal], [groupVal], [""], [""], [""], [tagsVal], [""], [codeVal], [""], [""], [startOverrideVal], [workOverrideVal]);

  console.log(write);

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

      var blanks = splitPaste.includes("");

      if (blanks == true) {

          var noBlanksArr = splitPaste.filter(function(x) {
              return x !== "";
          });

      } else {

          var noBlanksArr = splitPaste;

      };


      if (noBlanksArr[0].includes(":")) {

          var str = noBlanksArr[0];
          
          str = str.substring(str.indexOf(":") + 1);

          noBlanksArr.splice(0, 1, str);

      };

      var hasRequest = noBlanksArr[0].includes("CREATIVE REQUEST") || noBlanksArr[0].includes("Creative Request") || noBlanksArr[0].includes("ARTIST REQUEST") || noBlanksArr[0].includes("Artist Request");

      if (hasRequest == true) {

          noBlanksArr.shift();

      };

      var plasticS = removeFirstAndLastSpace(noBlanksArr[noBlanksArr.length - 2]);

      if (plasticS == "S" || plasticS == "Flat") {

          var plasticSIndex = noBlanksArr.indexOf(noBlanksArr[noBlanksArr.length - 2]);

          noBlanksArr.splice(plasticSIndex, 1);

          if (plasticS == "Flat") {

              var productPostFlatIndex = noBlanksArr.indexOf(noBlanksArr[noBlanksArr.length - 2]);

              noBlanksArr[productPostFlatIndex] = noBlanksArr[noBlanksArr.length - 2] + "Flat";

          };

      };

      if (noBlanksArr.length > 3) { //if the subject line includes a location, do this...

          // .NET stuff at end (~/*20104,51824,2*/~)
          // Remove spaces (just in case), "~/*", "*/~", then split at ","
          var splitCodes = noBlanksArr[noBlanksArr.length - 1].replace(' ','').replace('~/*','').replace('*/~','').split(",");

          var theClient = noBlanksArr[0];
          var updatedClient = removeFirstAndLastSpace(theClient);

          var theLocation = noBlanksArr[1];
          var updatedLocation = removeFirstAndLastSpace(theLocation);

          var theProduct = noBlanksArr[noBlanksArr.length - 2];
          var updatedProduct = removeFirstAndLastSpace(theProduct);
          updatedProduct = productAdjust(updatedProduct);

          var theCode = splitCodes[0];
          var updatedCode = removeFirstAndLastSpace(theCode);




          // if we can't fill the data out, error:
          try {
              $("#client").val(updatedClient);
              $("#location").val(updatedLocation);
              $("#product").val(updatedProduct).removeClass("grey-sel");
              $("#code").val(updatedCode);
          } catch (e) {
              // Something was wrong with the subject
              $("#message").show().text(`Something's wrong with this subject. Error: ` + e);
          }

      } else { //if subject line does not include a location, do this...

          // .NET stuff at end (~/*20104,51824,2*/~)
          // Remove spaces (just in case), "~/*", "*/~", then split at ","
          var splitCodes = noBlanksArr[2].replace(' ','').replace('~/*','').replace('*/~','').split(",");

          var theClient = noBlanksArr[0];
          var updatedClient = removeFirstAndLastSpace(theClient);

          var theProduct = noBlanksArr[1];
          var updatedProduct = removeFirstAndLastSpace(theProduct);
          updatedProduct = productAdjust(updatedProduct);

          var theCode = splitCodes[0];
          var updatedCode = removeFirstAndLastSpace(theCode);



          // if we can't fill the data out, error:
          try {
              $("#client").val(updatedClient);
              $("#product").val(updatedProduct).removeClass("grey-sel");
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

function productAdjust(leProductInput) {

  var leProduct;

  if ($.inArray(leProductInput, ["EDDM MENU", "MENU", "MenuFlat"]) >= 0) {
      leProduct = "Menu";

    } else if ($.inArray(leProductInput, ["EDDM XL MENU", "MenuXL", "MenuXLFlat"]) >= 0) {
      leProduct = "MenuXL";

    } else if ($.inArray(leProductInput, ["Menu Small"]) >= 0) {
      leProduct = "Small Menu";

    } else if ($.inArray(leProductInput, ["Brochure 10.5x17", "EDDMBroch"]) >= 0) {
      leProduct = "Brochure";

    } else if ($.inArray(leProductInput, ["BrochureXL", "EDDMBrochXL"]) >= 0) {
      leProduct = "BrochureXL";

    } else if ($.inArray(leProductInput, ["Brochure Small"]) >= 0) {
      leProduct = "Small Brochure";

    } else if ($.inArray(leProductInput, ["100# Gloss Postcard", "EDDM POSTCARD", "Long Postcard", "POSTCARD"]) >= 0) {
      leProduct = "Postcard";

    } else if ($.inArray(leProductInput, ["EDDMJumboPC", "JUMBOPC"]) >= 0) {
      leProduct = "Jumbo Postcard";

    } else if ($.inArray(leProductInput, ["ColossalPC", "EDDMColossal"]) >= 0) {
      leProduct = "Colossal Postcard";

    } else if ($.inArray(leProductInput, ["EDDM Scratch Off", "SCRATCHOFF"]) >= 0) {
      leProduct = "Scratch-Off Postcard";

    } else if ($.inArray(leProductInput, ["EDDMJumboSO", "Jumbo Scratch"]) >= 0) {
      leProduct = "Jumbo Scratch-Off Postcard";

    } else if ($.inArray(leProductInput, ["EDDMPeelAGift", "EDDMPizzaPeelCard", "Peel A Gift", "PizzaPeelCard"]) >= 0) {
      leProduct = "Peel-A-Box Postcard";

    } else if ($.inArray(leProductInput, ["EDDM Mag", "MAGNET"]) >= 0) {
      leProduct = "Magnet";

    } else if ($.inArray(leProductInput, ["EDDM Folded Magnet", "Folded Magnet"]) >= 0) {
      leProduct = "Folded Magnet";

    } else if ($.inArray(leProductInput, ["2 sided box topper", "2 Sided Flyer"]) >= 0) {
      leProduct = "2SBT";

    } else if ($.inArray(leProductInput, ["Box Topper January", "Box Topper February", "Box Topper March", "Box Topper April", "Box Topper May", "Box Topper June", "Box Topper July", "Box Topper August", "Box Topper September", "Box Topper October", "Box Topper November", "Box Topper December"]) >= 0) {
      leProduct = "Box Topper";

    } else if ($.inArray(leProductInput, ["80LBFLYER", "Flyer 8.5X11"]) >= 0) {
      leProduct = "Flyer";

    } else if ($.inArray(leProductInput, ["DOOR HANGER 100LB"]) >= 0) {
      leProduct = "Door Hanger";

    } else if ($.inArray(leProductInput, ["Plastic PC Sm"]) >= 0) {
      leProduct = "Small Plastic";

    } else if ($.inArray(leProductInput, ["Plastic PC Med"]) >= 0) {
      leProduct = "Medium Plastic";

    } else if ($.inArray(leProductInput, ["Plastic PC Lg"]) >= 0) {
      leProduct = "Large Plastic";

    } else if ($.inArray(leProductInput, ["COUPON BOOK"]) >= 0) {
      leProduct = "Coupon Booklet";

    } else if ($.inArray(leProductInput, ["CustomEnv", "Env #10 8.5x11 S1", "Env #10 8.5x11 S2", "Env #10 8.5x11 V1", "Env #10 8.5x11 V2"]) >= 0) {
      leProduct = "Envelope Mailer";

    } else if ($.inArray(leProductInput, ["BirthdayPC"]) >= 0) {
      leProduct = "Birthday Postcard";

    } else if ($.inArray(leProductInput, ["NEW MOVERS POSTCARD"]) >= 0) {
      leProduct = "New Mover";

    } else if ($.inArray(leProductInput, ["NEW MOVERS PLASTIC"]) >= 0) {
      leProduct = "Plastic New Mover";

    } else if ($.inArray(leProductInput, ["WCCust", "WC2030", "WC2430", "WC2436", "WC3040"]) >= 0) {
      leProduct = "Window Clings";

    } else if ($.inArray(leProductInput, ["BusinessCard"]) >= 0) {
      leProduct = "Business Cards";

    } else if ($.inArray(leProductInput, ["Artwork Only"]) >= 0) {
      leProduct = "Artwork Only";

    } else if ($.inArray(leProductInput, ["Env #10 8.5x14 S1", "Env #10 8.5x14 S2", "Env #10 8.5x14 V1", "Env #10 8.5x14 V2"]) >= 0) {
      leProduct = "Legal Letter";

    } else if ($.inArray(leProductInput, ["Custom Insert"]) >= 0) {
      leProduct = "Envelope Insert";

    } else if ($.inArray(leProductInput, ["MENU XXL"]) >= 0) {
      leProduct = "MenuXXL";

  } else if ($.inArray(leProductInput, ["MPBTAC"]) >= 0) {
      leProduct = "Marco's 6.8 Box Topper A La Carte - MPBTAC";

  } else if ($.inArray(leProductInput, ["MPBTNO"]) >= 0) {
      leProduct = "Marco's 6.8 Box Topper National Offer - MPBTNO";

  } else if ($.inArray(leProductInput, ["MPP"]) >= 0) { 
      leProduct = "Marco's 8.5x11 Poster - MPP";

  } else if ($.inArray(leProductInput, ["MPPO2436"]) >= 0) { 
      leProduct = "Marco's 24x36 Poster - MPPO2436";

  } else if ($.inArray(leProductInput, ["MPPO3040"]) >= 0) { 
      leProduct = "Marco's 30x40 Poster - MPPO3040";

  } else if ($.inArray(leProductInput, ["MPCC"]) >= 0) { 
      leProduct = "Marco's Counter Card - MPCC";

  } else if ($.inArray(leProductInput, ["MPCMS"]) >= 0) { 
      leProduct = "Marco's Door Stickers - MPCMS";

  } else if ($.inArray(leProductInput, ["MPIS"]) >= 0) { 
      leProduct = "Marco's Interior Sticker - MPIS";

  } else if ($.inArray(leProductInput, ["MPSCFS"]) >= 0) { 
      leProduct = "Marco's Floor Stickers - MPSCFS";

  } else if ($.inArray(leProductInput, ["MPND"]) >= 0) { 
      leProduct = "Marco's Napkin Dispenser Insert - MPND";

  } else if ($.inArray(leProductInput, ["MPPICMENU"]) >= 0) { 
      leProduct = "Marco's Laminated Menu - MPPICMENU";

  } else if ($.inArray(leProductInput, ["MPCVDLAM"]) >= 0) { 
      leProduct = "Marco's Laminated Sign - MPCVDLAM";

  } else if ($.inArray(leProductInput, ["MPC"]) >= 0) { 
      leProduct = "Marco's 8.5x11 Window Cling - MPC";

  } else if ($.inArray(leProductInput, ["MPEXTWC2436AC"]) >= 0) { 
      leProduct = "Marco's 24x36 Exterior Window Cling A La Carte - MPEXTWC2436AC";

  } else if ($.inArray(leProductInput, ["MPEXTWC2436NO"]) >= 0) { 
      leProduct = "Marco's 24x36 Exterior Window Cling National Offer - MPEXTWC2436NO";

  } else if ($.inArray(leProductInput, ["MPEXTWC3040AC"]) >= 0) { 
      leProduct = "Marco's 30x40 Exterior Window Cling A La Carte - MPEXTWC3040AC";

  } else if ($.inArray(leProductInput, ["MPEXTWC3040NO"]) >= 0) { 
      leProduct = "Marco's 30x40 Exterior Window Cling National Offer - MPEXTWC3040NO";

  } else if ($.inArray(leProductInput, ["MPINTWC2436AC"]) >= 0) { 
      leProduct = "Marco's 24x36 Interior Window Cling A La Carte - MPINTWC2436AC";

  } else if ($.inArray(leProductInput, ["MPINTWC2436NO"]) >= 0) { 
      leProduct = "Marco's 24x36 Interior Window Cling National Offer - MPINTWC2436NO";

  } else if ($.inArray(leProductInput, ["MPINTWC3040AC"]) >= 0) { 
      leProduct = "Marco's 30x40 Interior Window Cling A La Carte - MPINTWC3040AC";

  } else if ($.inArray(leProductInput, ["MPINTWC3040NO"]) >= 0) { 
      leProduct = "Marco's 30x40 Interior Window Cling National Offer - MPINTWC3040NO";

  } else if ($.inArray(leProductInput, ["MPNutGuide"]) >= 0) { 
      leProduct = "Marco's Nutritional Guide - MPNutGuide";

  } else if ($.inArray(leProductInput, ["Custom100", "CUSTOM80", "CustomSilk", "Other"]) >= 0) { 
      leProduct = "Other";

  } else {
  leProduct = "";
  };

  return leProduct;

};





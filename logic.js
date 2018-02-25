
 var config = {
  apiKey: "AIzaSyBcQvFbP4_rTM9Z-TJLRROOGYFjCjcKPOQ",
  authDomain: "choochoo-a4c48.firebaseapp.com",
  databaseURL: "https://choochoo-a4c48.firebaseio.com",
  projectId: "choochoo-a4c48",
  storageBucket: "choochoo-a4c48.appspot.com",
  messagingSenderId: "240561075551"
};
firebase.initializeApp(config);


var database = firebase.database();
var trainRef = database.ref("/trainData");
var name = "";
var destination = "";
var time = 0000;
var frequency = 00;



$("#submit-train").on("click", function() {
	event.preventDefault();
  // Get the input values
  var trnName = $("#train-name").val().trim();
  var trnDestination = $("#destination").val().trim();
  var trnTime = moment($("#train-time").val().trim(), "HH:mm").format();
  var trnFrequency = parseInt($("#frequency").val().trim());

  
  var newTrn = {
  	name: trnName,
  	destination: trnDestination,
  	time: trnTime,
  	frequency: trnFrequency
  }

// Save the new train in Firebase
    database.ref("/trainData").push(newTrn);

  // Train Info
  console.log(newTrn.name);
  console.log(newTrn.destination);
  console.log(newTrn.time);
  console.log(newTrn.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#train-time").val("");
  $("#frequency").val("");

  // Prevents moving to new page
  return false;

}); //end of submit-train event

//Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref("/trainData").on("child_added", function(childSnapshot, prevChildKey) {

	console.log(childSnapshot.val());

	// Store everything into a variable.
  var trnName = childSnapshot.val().name;
  var trnDestination = childSnapshot.val().destination;
  var trnTime = childSnapshot.val().time;
  var trnFrequency = childSnapshot.val().frequency;

  console.log(trnName);
  console.log(trnDestination);
  console.log(trnTime);
  console.log(trnFrequency);

  // First Train Time (pushed back 1 year to make sure it comes before current time)
    var trnTimeConverted = moment(trnTime, "HH:mm").subtract(1, "years");
    console.log(trnTimeConverted);

  // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(trnTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var trnRemainder = diffTime % trnFrequency;
    console.log(trnRemainder);

    // Minute Until Train
    var trnMinutesTill = trnFrequency - trnRemainder;
    console.log("MINUTES TILL TRAIN: " + trnMinutesTill);

    // Next Train
    var nextTrain = moment().add(trnMinutesTill, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

  

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trnName + "</td><td>" + trnDestination + "</td><td>" +
  trnFrequency + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + trnMinutesTill + "</td><td>" + "" + "</td></tr>");
});

	
	//Take first train start time, calculate using frequency train times throughout the day
	//Find current time
	//Find next train time after current time


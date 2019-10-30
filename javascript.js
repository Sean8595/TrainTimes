var firebaseConfig = {
    apiKey: "AIzaSyDJVZPGui3KQKp3r61Wnf_mo8Cc5HButmE",
    authDomain: "jobsdone-b04b1.firebaseapp.com",
    databaseURL: "https://jobsdone-b04b1.firebaseio.com",
    projectId: "jobsdone-b04b1",
    storageBucket: "jobsdone-b04b1.appspot.com",
    messagingSenderId: "235026594794",
    appId: "1:235026594794:web:1589a3895f595d08965093"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var sv = snapshot.val();
//-----------------------------------------------------------------------------------
var database = firebase.database();
var name = "";
var destination = "";
var firstTrain = sv.firstTrain;
var frequency = sv.frequency;


$("#add-train").on("click", function (event) {
    event.preventDefault();
    console.log("clicked")
    
    // Grabbed values from text boxes
    name = $("#name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#firstTrain").val().trim();
    frequency = $("#frequency").val().trim();

    var time = moment(firstTrain, "HH:mm").subtract(1, "years");

    console.log(time);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(time), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain))

    var TextNextTrain = moment(nextTrain).format("hh:mm")


    database.ref().push({
        name: name,
        destination: destination,
        TextNextTrain: TextNextTrain,
        frequency: frequency,
        tMinutesTillTrain: tMinutesTillTrain,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

database.ref().on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    
    

    // Console.loging the last user's data
    // console.log(sv.name);
    // console.log(sv.destination);
    // console.log(sv.firstTrain);
    // console.log(sv.frequency);

    // Change the HTML to reflect
    var newRow = $("<tr>");
    var nameTD = $("<td>").text(sv.name);
    var destTD = $("<td>").text(sv.destination);
    var frqTD = $("<td>").text(sv.frequency);
    var NTrainTD = $("<td>").text(sv.TextNextTrain);
    var timenextTD = $("<td>").text(sv.tMinutesTillTrain);


    newRow.append(nameTD);
    newRow.append(destTD);
    newRow.append(frqTD);
    newRow.append(NTrainTD);
    newRow.append(timenextTD);
    $("#newNew").append(newRow);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
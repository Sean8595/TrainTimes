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


//-----------------------------------------------------------------------------------
var database = firebase.database();
var name = "";
var destination = "";
var firstTrain = "10:10";
var frequency = 3;


$("#add-train").on("click", function (event) {
    event.preventDefault();
    console.log("clicked")
    
    // Grabbed values from text boxes
    name = $("#name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#firstTrain").val().trim();
    frequency = $("#frequency").val().trim();
    console.log(name)



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




    database.ref().push({
        name: name,
        destination: destination,
        firstTimeConverted: firstTimeConverted,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

database.ref().on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();
    

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
    var ftrain = $("<td>").text(sv.firstTimeConverted);

    newRow.append(nameTD);
    newRow.append(destTD);
    newRow.append(frqTD);
    newRow.append(ftrain);
    $("#newNew").append(newRow);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
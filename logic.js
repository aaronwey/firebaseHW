var config = {
    apiKey: "AIzaSyBINCOQ8E6IpbQI9-8HKBDvZF_MCFk7Sfs",
    authDomain: "weddemo-1afa1.firebaseapp.com",
    databaseURL: "https://weddemo-1afa1.firebaseio.com",
    projectId: "weddemo-1afa1",
    storageBucket: "weddemo-1afa1.appspot.com",
    messagingSenderId: "683297747668"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var TrainName = "";
  var Destination = "";
  var FirstTrainTime = "";
  var tFrequency = "";
  var minutesAway = "";
  var nextArrival = "";




$(".submitButton").on("click", function(){
	event.preventDefault();

	TrainName = $(".TrainName").val().trim();
	Destination = $(".Destination").val().trim();
	FirstTrainTime = $(".FirstTrainTime").val().trim();
	tFrequency = $(".tFrequency").val().trim();

  var newTrain = {
    TrainName: TrainName,
    Destination: Destination,
    FirstTrainTime: FirstTrainTime,
    tFrequency: tFrequency
  };

  database.ref().push(newTrain);

  $(".TrainName").val("");
  $(".Destination").val("");
  $(".FirstTrainTime").val("");
  $(".tFrequency").val("");

});
  database.ref().on("child_added", function(childSnapshot, prevChildKey){
  FirstTrainConverted = moment(FirstTrainTime, "hh:mm").subtract(1, "years");
  console.log(FirstTrainConverted);
  var currentTime = moment();

  console.log(currentTime);
  console.log("current time: " + moment(currentTime).format("hh:mm"));

  var diffTime = currentTime.diff(moment(FirstTrainConverted), "minutes");
  var tRemainder = diffTime % tFrequency;
  var tMinutesTillTrain = tFrequency - tRemainder;
  minutesAway = moment().add(tMinutesTillTrain, "minutes");
  nextArrival = moment(minutesAway).format("hh:mm");

  console.log(tMinutesTillTrain);
  console.log(nextArrival);


	// database.ref().set({
	// 	TrainName: TrainName,
	// 	Destination: Destination,
	// 	FirstTrainTime: FirstTrainTime,
	// 	tFrequency: tFrequency,
    // tMinutesTillTrain: tMinutesTillTrain,
    // nextArrival: nextArrival

// });


    // console.log(snapshot.val());
    $(".tableBody").append("<tr><td>" + childSnapshot.val().TrainName +"</td><td>" + childSnapshot.val().Destination + "</td><td>" + childSnapshot.val().tFrequency + "</td><td>" + nextArrival + "</td><td>" + tMinutesTillTrain +"</td></tr>");
  });


//add this to the .html
//<script src="https://www.gstatic.com/firebasejs/4.9.0/firebase.js"></script>
  // Initialize Firebase

  $(document).ready(function() { 

  var config = {
    apiKey: "AIzaSyCs0Ve4ReduYXfyBwRzamSusTFRb3olTq8",
    authDomain: "employee-tracker-7401b.firebaseapp.com",
    databaseURL: "https://employee-tracker-7401b.firebaseio.com",
    projectId: "employee-tracker-7401b",
    storageBucket: "",
    messagingSenderId: "424028788232"
  };

 firebase.initializeApp(config);
 var database=firebase.database();

 console.log("hello");

 $("#submit").on("click", function() {
    // Don't refresh the page!
      event.preventDefault();
      console.log("click detected");

      var name = $("#name").val().trim();
      var role = $("#role").val().trim();
      var date = $("#date").val();
      var rate = $("#rate").val().trim();

     database.ref().push({
        name: name,
        role: role,
        date: date,
        rate: rate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

   });

   database.ref().on("child_added", function(childSnapshot){
      
      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().role);
      console.log(childSnapshot.val().date);
      console.log(childSnapshot.val().rate);
     

  
   $("tbody").append("<tr> <td> " + childSnapshot.val().name + "</td> <td> " + childSnapshot.val().role + 
    "</td> <td> " + childSnapshot.val().date + " </td><td></td><td> " + childSnapshot.val().rate + "</td> </tr>");
 
 }, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);

 });

  database.ref().orderByChild("data-added").limitToLast(1).on ("child_added", function(snapshot) {
    $("#name").text(snapshot.val().name);
    $("#role").text(snapshot.val().role);
    $("#date").text(snapshot.val().date);
    $("#rate").text(snapshot.val().rate);

  });


});
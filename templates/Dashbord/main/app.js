// Initialize Firebase
var config = {
  apiKey: "AIzaSyCvNo0fzI_RX4k9R0ZgkSDt8LWOpsP2FaM",
  authDomain: "dokonsulta-d5145.firebaseapp.com",
  databaseURL: "https://dokonsulta-d5145-default-rtdb.firebaseio.com",
  projectId: "dokonsulta-d5145",
  storageBucket: "dokonsulta-d5145.appspot.com",
  messagingSenderId: "427575389379",
  appId: "1:427575389379:web:505a3f3ca8eec6945ac676",
  measurementId: "G-LBH6E12KWG"
};

firebase.initializeApp(config);

var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var created_at = date + ' ' + time;
function img(id) {
  document.getElementById("img").setAttribute("src", id)
}

/**function signup() {
  
  var number = document.getElementById("mnum").value;
  
    
    if (number.length != 11) {
      document.getElementById("error2").style.display = 'block';
    }
    else {
      document.getElementById("error2").style.display = 'none';
      signupCode();
    }
  }
**/

function  signup() {
  document.getElementById("p2").style.display = 'block';
  var First_name = document.getElementById("fname").value;
  First_name = First_name.slice(0, 1).toUpperCase() + First_name.slice(1).toLowerCase();
  var Last_name = document.getElementById("lname").value;
  Last_name = Last_name.slice(0, 1).toUpperCase() + Last_name.slice(1).toLowerCase();
  var Middle_name = document.getElementById("mname").value;
  Middle_name = Middle_name.slice(0, 1).toUpperCase() + Middle_name.slice(1).toLowerCase();
  var Email_address = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  //var Date_of_birth = document.getElementById("age").value;
  var a= document.getElementById("month").value;
  var b= document.getElementById("day").value;
  var c= document.getElementById("year").value;
  //var address = document.getElementById("address").value;
  var Contact_number = document.getElementById("mnum").value;
  var Gender = document.getElementById("gender");
  //var gender = e.options[e.selectedIndex].value;
  //var e = document.getElementById("age");
  //var specialty = document.getElementById("specialty").value;
  //specialty = specialty.slice(0, 1).toUpperCase() + specialty.slice(1).toLowerCase();
  //var type = 'doctor';
  //var profilePic = document.getElementById("profilePic").files[0];
  var Date_of_birth=a+"/"+b+"/"+c;
  var userObj = {
    First_name,
    Last_name,
    Middle_name,
    //specialty,
    Date_of_birth,
    Email_address,
    password,
    created_at,
    Gender,
    Contact_number,
    //age,
    //bloodGroup,
    //address,
    //type,
  }

  console.log(userObj);
   
  firebase.auth().createUserWithEmailAndPassword(Email_address, password)
    .then(() => {
      let userUid = firebase.auth().currentUser.uid;
      //  firebase.storage().ref().child(`profile/${profilePic.name}`).put(profilePic).then((url) => {
      //  url.ref.getDownloadURL().then((success) => {
      ///  userObj.profilePic = success;

      firebase.database().ref("users/" + userUid).set(userObj)
        .then(() => {
          document.getElementById("p2").style.display = 'none';
          swal({
            type: 'success',
            title: 'Congratulations!',
            text: 'Your Account Created Successfully!',
            confirmButtonText: "Go Login!",
            confirmButtonColor: "#fa7c6e"
          }).then((result) => {
            if (result.value) {
              location = 'login.html';
            }
            else {
              location = 'login.html';
            }
          })

        })
        .catch((error) => {
          document.getElementById("p2").style.display = 'none';
          swal({
            type: 'error',
            title: 'Something went wrong!',
            text: error.message,
            confirmButtonColor: "#fa7c6e"
          })
        })
    }) 
}

function login() {
  document.getElementById("p2").style.display = 'block';
 
  var email = document.getElementById("emaillog").value;
  var password = document.getElementById("passwordlog").value;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {   location = 'login.html'
   /** let users = firebase.auth().currentUser.uid;
      firebase.database().ref("users/" + users).once("value").then((data) => {
        const dataType = data.val();
        console.log(dataType)
        if (dataType.type === "doctor") {
          location = 'panel.html'
        }
        else if (dataType.type === "Donor") {
          location = 'donor.html'
        }
        else if (dataType.type === "Acceptor") {
          location = 'acceptor.html'
        }
      })***/  
    })
    .catch((error) => {
      document.getElementById("p2").style.display = 'none';
      swal({
        type: 'error',
        title: 'Something went wrong!',
        text: error.message,
        confirmButtonColor: "#fa7c6e"
      })
    })
}

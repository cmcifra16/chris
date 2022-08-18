var firebaseConfig = {
    apiKey: "AIzaSyCvNo0fzI_RX4k9R0ZgkSDt8LWOpsP2FaM",
    authDomain: "dokonsulta-d5145.firebaseapp.com",
    databaseURL: "https://dokonsulta-d5145-default-rtdb.firebaseio.com",
    projectId: "dokonsulta-d5145",
    storageBucket: "dokonsulta-d5145.appspot.com",
    messagingSenderId: "427575389379",
    appId: "1:427575389379:web:505a3f3ca8eec6945ac676",
    measurementId: "G-LBH6E12KWG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();



firebase.auth().Auth().Persistance.LOCAL;
function login() {
    var email = $("#email").val();
    var password = $("#password").val();
    if (email != "" && password != "") {
        firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
            window.location.href = "../templates/userDash.html";
        }).catch(function (error) {
            var errorcode = error.code;
            var message = error.message;
            console.log(message);
            console.log(errorcode);
            window.alert("message:" + message);
        });

    }
    else {
        window.alert("plz fill all fields");
    }
}



/** 

register() {
    var uname=$("#username").val();
    var name=$("#fname").val();
    var name=$("#lname").val();
    var email=$("#email").val();
        var password=$("#password").val();
        var cpassword=$("#confirmPassword").val();
        if(email!="" && password!="" && cpassword!="" && uname!="" && fname!="" &l& name!="")
        {
                if(password == cpassword)
                {
                    firebase.auth().createUserWithEmailAndPassword(email,password).then(function(){
                      window.alert("successfully registered.");
                      var firebaseRef = firebase.database().ref();
                      var userData = {
                        uname: uname,
                          fname: fname,
                          lname: lname,
                          email: email,
                          password: password,
                          userFb: "https://www.facebook.com/",
                          userTw: "https://twitter.com/",
                          userGp: "https://plus.google.com/",
                          userBio: "User biography",
                      }
                      firebaseRef.child(uid).set(userData);
                      swal('Your Account Created', 'Your account was created successfully, you can log in now.',
                      ).then((value) => {
                          setTimeout(function () {
                              window.location.replace("../index.html");
                          }, 1000)
                      });
                    //   window.location.href = "accountsettings.html"; 
                       }).catch(function(error){
                        var errorcode=error.code;
                                                var message=error.message;
                                                console.log(message);
                                                console.log(errorcode);
                                                window.alert("message:"+message);
                       });    
        }
        else{
            window.alert("password do not match with confirm password.");
        }

        
    }
    else{
        window.alert("please fill out this feilds.");
    }
}


*/





function register() {
    var uname = $("#username").val();
    var name = $("#name").val();
    var email = $("#email").val();
    var password = $("#password").val();
    var cpassword = $("#confirmPassword").val();
    if (email != "" && password != "") {
        if (password == cpassword) {

            firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
                window.location.href = "../templates/userDash.html";
                window.alert("successfully registered.");


                //   window.location.href = "accountsettings.html"; 
            }).catch(function (error) {
                var errorcode = error.code;
                var message = error.message;
                console.log(message);
                console.log(errorcode);
                window.alert("message:" + message);

            });
        }
        else {
            window.alert("password do not match with confirm password.");
        }


    }
    else {
        window.alert("please fill out this feilds.");
    }
}

function reset() {
    var auth = firebase.auth();
    var email = document.getElementById("email").value;
    // var email=$("#email").val();
    if (email != "") {
        auth.sendPasswordResetEmail(email).then(function () {
            window.alert("please verify your email");

        }).catch(function (error) {
            var errorcode = error.code;
            var message = error.message;
            console.log(message);
            console.log(errorcode);
            window.alert("message:" + message);
        });
    } else {
        window.alert("please enter email id");

    }
}

function signOut() {
    firebase.auth().signOut().then(function () {
        window.location.href = "../login/signin.html";
    }).catch(function (error) {

    });
}

function myFunction5() {
    var phone = $("#phone").val();
    var address = $("#address").val();
    var bio = $("#bio").val();
    var firstname = $("#first").val();
    var lastname = $("#last").val();
    var country = $("#country").val();
    var gender = $("#gender").val();

    var rootRef = firebase.database().ref().child("Users");
    var userID = firebase.auth().currentUser.uid;
    var userRef = rootRef.child(userID);

    if (firstname != "" && lastname != "" && phone != "" && address != "" && bio != "" && gender != "" && country != "") {

        var userData =

        {
            "FirstName": firstname,
            "LastName": lastname,
            "bio": bio,
            "phone": phone,
            "gender": gender,
            "country": country,
            "address": address,
        };

        userRef.set(userData, function (error) {
            if (error) {
                var errorcode = error.code;
                var message = error.message;
                console.log(message);
                console.log(errorcode);
                window.alert("message:" + message);
            } else {
                // window.alert("message:");
                window.location.href = "home.html";
            }
        });

    }
    else {
        window.alert("please fill out feilds.");
    }
}

function Delete() {

    var user = firebase.auth().currentUser;
    window.alert(user.uid);

    user.delete().then(function () {
        window.alert("account deleted");
    }).catch(function (error) {
        window.alert("error");
    });
    DeleteData();

}

function DeleteData() {
    var userID = firebase.auth().currentUser.uid;
    window.alert(userID);
    firebase.database().ref('Users/' + userID).remove();
    window.alert("data deleted");

}

function UpdateDataUser() {

    var phone = $("#phone").val();
    var address = $("#address").val();
    var bio = $("#bio").val();
    var firstname = $("#first").val();
    var lastname = $("#last").val();
    var country = $("#country").val();
    var gender = $("#gender").val();


    var rootRef = firebase.database().ref().child("Users");
    var userID = firebase.auth().currentUser.uid;
    var userRef = rootRef.child(userID);

    if (firstname != "" && lastname != "" && phone != "" && address != "" && bio != "" && gender != "" && country != "") {
        var userData =
        {
            "FirstName": firstname,
            "LastName": lastname,
            "bio": bio,
            "phone": phone,
            "gender": gender,
            "country": country,
            "address": address,
        };

        userRef.set(userData, function (error) {
            if (error) {
                var errorcode = error.code;
                var message = error.message;
                console.log(message);
                console.log(errorcode);
                window.alert("message:" + message);
            } else {
                // window.alert("message:");
                window.location.href = "home.html";
            }
        });

    }
    else {
        window.alert("please fill out the missing feilds.");
    }
}
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

window.addEventListener("load", async function loader() {
    await load();
})

async function load() {
    await firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var userId = firebase.auth().currentUser.uid;

            firebase.database().ref("users/" + userId).once("value").then((data) => {
                document.getElementById("loader").style.display = 'none';
                let alert = data.val();
               
                document.getElementById("profilePic").setAttribute("title", alert.First_name)
                document.getElementById("acceptorPost").value = alert.First_name;
                document.getElementById("userName").innerHTML = alert.First_name;
                document.getElementById("userName").setAttribute("title", "Name")
                document.getElementById("userType").innerHTML = "(" + alert.First_name + ")";
             
                document.getElementById("mainBox").style.display = 'block';
                document.getElementById("profile").innerHTML = `
                    <p class='typeBox' title='type'><i class='fa fa-user-plus'></i> ${alert.First_name}</p>
                    <p class='dp' title='Dp'><img src='../images/avatar.png'></p>
                    <p class='name' title='Name'>${alert.First_name}</p>
                    
                    <hr />
                    <div style='text-align:left'>
                    
                        <p><span title='Age' style='font-weight:bold'><i class='fa fa-child' style='color:#000000;'></i> Age : </span> ${alert.First_name}</p>
                        <p><span title='Gender' style='font-weight:bold'><i class='fa fa-neuter' style='color:#000000;'></i> Gender : </span> ${alert.First_namer}</p>
                        <p><span title='Number' style='font-weight:bold'><i class='fa fa-phone' style='color:#000000;'></i> Phone : </span> ${alert.First_name}</p>
                        <p><span title='Email' style='font-weight:bold'><i class='fa fa-envelope' style='color:#000000;'></i> Email : </span> ${alert.First_name}</p>
                        <p><span title='Address' style='font-weight:bold'><i class='fa fa-map-marker' style='color:#000000;'></i> Address : </span> ${alert.First_name}</p>
                    </div>
                    <hr />
                ` 
            })
                .catch((error) => {
                    swal({
                        type: 'error',
                        title: 'Something went wrong!',
                        text: error.message,
                        confirmButtonColor: "#fa7c6e"
                    })
                })
            firebase.database().ref("donors/"  ).once("value").then((data) => {
                let donors = data.val();
                var counter = 0;
               let arr= []
                for (var key in donors) {
                    counter++;

                    document.getElementById("donors").innerHTML += `
                        <div class='donorBox' id='${key}'>
                            <p class='typeBox' title='Type'><i class='fa fa-plus-square'></i> ${"Doctors"}</p>
                            <div class='paddBox'>
                            <p class='dp' title='Dp'><img src='${donors[key].profilePic}' height='100px' width='100px'></p>
                            <p class='name' title='Name'>${donors[key].First_name+donors[key].Last_name+donors[key].Middle_name}</p>
                            <p><span class='bGroup' title='Blood Group'>${donors[key].specialty}</span></p>

                             <p id='${key + counter}'><button style='width:100%; background-color:#25c481; border-color:#000000;' onclick='book()'  class='btn btn-danger'><i class='fa fa-plus-square'></i> Book Appointment</button></p>
                            <hr />

                            
                            <p class='oD' title='Age'><span style='font-weight:bold'><i class='fa fa-child' style='color:#000000;'></i> Age : </span> ${donors[key].Date_of_birth}</p>
                            <p class='oD' title='Gender'><span style='font-weight:bold'><i class='fa fa-neuter' style='color:#000000;'></i> Gender : </span> ${donors[key].Gender}</p>
                            <p class='oD' title='Number'><span style='font-weight:bold'><i class='fa fa-phone' style='color:#000000;'></i> Phone : </span> ${donors[key].Contact_number}</p>
                            <p class='oD' title='Email'><span style='font-weight:bold'><i class='fa fa-envelope' style='color:#000000;'></i> Email : </span> ${donors[key].Email_address}</p>
                            <p class='oD' title='Address'><span style='font-weight:bold'><i class='fa fa-map-marker' style='color:#000000;'></i> Address : </span> ${donors[key].address}</p>
                            <hr />
                            </div>  
                            `
                         
                    
                } 
                
            })
                .catch((error) => {
                    swal({
                        type: 'error',
                        title: 'Something went wrong!',
                        text: error.message,
                        confirmButtonColor: "#fa7c6e"
                    })
                })

function book(){
    var userId = firebase.auth().currentUser.uid;

    firebase.database().ref("users/" + userId)
    var docid = document.getElementsByClassName("donoxBox").value;



}
/**********----------------------------user------------------------*** */



            firebase.database().ref("users/" + userId).once("value").then((data) => {
                let post = data.val();
                console.log(post)
                document.getElementById("myPost").innerHTML = `
                        <div class='postBox' id='${userId}'>
                            <p class='typeBox' title='Type'><i class='fa fa-plus-square'></i> ${post.type}</p>
                            <div class='paddBox'>
                            <p class='dp' title='Dp'><img src='${post.profilePic}' height='100px' width='100px'></p>
                            <p class='name' title='Name'>${post.name}</p>
                            <p><span class='bGroup' title='Blood Group'>${post.bloodGroup}</span></p>
                            <p class='post' title='Post'><i class='fa fa-quote-left' style='font-size:60%; color:rgb(18, 165, 165)''></i><br /> ${post.post} <br /><i class='fa fa-quote-right' style='font-size:60%; color:rgb(18, 165, 165)''></i></p>
                            <hr />
                            <p class='oD' title='Age'><span style='font-weight:bold'><i class='fa fa-child' style='color:#000000;'></i> Age : </span> ${post.age}</p>
                            <p class='oD' title='Gender'><span style='font-weight:bold'><i class='fa fa-neuter' style='color:#000000;'></i> Gender : </span> ${post.gender}</p>
                            <p class='oD' title='Number'><span style='font-weight:bold'><i class='fa fa-phone' style='color:#000000;'></i> Phone : </span> ${post.number}</p>
                            <p class='oD' title='Email'><span style='font-weight:bold'><i class='fa fa-envelope' style='color:#000000;'></i> Email : </span> ${post.email}</p>
                            <p class='oD' title='Address'><span style='font-weight:bold'><i class='fa fa-map-marker' style='color:#000000;'></i> Address : </span> ${post.address}</p>
                            <hr />
                            <button class='btn btn-danger title='Edit Post' style='width:100%;' dltBtn' data-toggle="modal" data-target="#edit"><i class='fa fa-edit'></i> Edit</button>
                            </div>
                            </div>  
                    `
            })
                .catch((error) => {
                    swal({
                        type: 'error',
                        title: 'Something went wrong!',
                        text: error.message,
                        confirmButtonColor: "#fa7c6e"
                    })
                })
        }
        else {

        }
    })
}
function logout() {
    firebase.auth().signOut().then(() => {
        location = './login.html';
    })
        .catch((error) => {
            swal({
                type: 'error',
                title: 'Something went wrong!',
                text: error.message,
                confirmButtonColor: "#fa7c6e"
            })
        })
}
 
var donors = "";
firebase.database().ref("donors/").once("value").then((data) => {
    let donorss = data.val();
    donors = donorss;
})

function filter(request) {
    if (request !== "default") {
        var counter = 0;
        document.getElementById("donors").innerHTML = '';
        console.log("success")
        for (var key in donors) {
            if (donors[key].bloodGroup === request) {
                counter++;
                document.getElementById("donors").innerHTML += `
            <div class='donorBox' id='${key}'>
            <p class='typeBox' title='Type'><i class='fa fa-plus-square'></i> ${donors[key].type}</p>
            <div class='paddBox'>
            <p class='dp' title='Dp'><img src='${donors[key].profilePic}' height='100px' width='100px'></p>
            <p class='name' title='Name'>${donors[key].name}</p>
            <p><span class='bGroup' title='Blood Group'>${donors[key].bloodGroup}</span></p>
            <p class='post' title='Post'><i class='fa fa-quote-left' style='font-size:60%; color:rgb(18, 165, 165)'></i><br /> ${donors[key].post} <br /><i class='fa fa-quote-right' style='font-size:60%; color:rgb(18, 165, 165)''></i></p>
            <p id='${key + counter}'><button style='width:100%;' onclick='accept()' class='btn btn-danger'><i class='fa fa-plus-square'></i> Accept Now</button></p>
            <hr />
            <p class='oD' title='Age'><span style='font-weight:bold'><i class='fa fa-child' style='color:#000000;'></i> Age : </span> ${donors[key].age}</p>
            <p class='oD' title='Gender'><span style='font-weight:bold'><i class='fa fa-neuter' style='color:#000000;'></i> Gender : </span> ${donors[key].gender}</p>
            <p class='oD' title='Number'><span style='font-weight:bold'><i class='fa fa-phone' style='color:#000000;'></i> Phone : </span> ${donors[key].number}</p>
            <p class='oD' title='Email'><span style='font-weight:bold'><i class='fa fa-envelope' style='color:#000000;'></i> Email : </span> ${donors[key].email}</p>
            <p class='oD' title='Address'><span style='font-weight:bold'><i class='fa fa-map-marker' style='color:#000000;'></i> Address : </span> ${donors[key].address}</p>
            <hr />
            </div>  
             `
            }
        }
        if (counter === 0) {
            document.getElementById("donors").innerHTML = `<p class='null' title='Donors Not Found'>There is no donor of ${request} Blood!</p>`
        }
    }
    else {
        var counter = 0;
        document.getElementById("donors").innerHTML = '';
        for (var key in donors) {
            counter++;
            document.getElementById("donors").innerHTML += `
                <div class='donorBox' id='${key}'>
                <p class='typeBox' title='Type'><i class='fa fa-plus-square'></i> ${donors[key].type}</p>
                <div class='paddBox'>
                <p class='dp' title='Dp'><img src='${donors[key].profilePic}' height='100px' width='100px'></p>
                <p class='name' title='Name'>${donors[key].name}</p>
                <p><span class='bGroup' title='Blood Group'>${donors[key].bloodGroup}</span></p>
                <p class='post' title='Post'><i class='fa fa-quote-left' style='font-size:60%; color:rgb(18, 165, 165)'></i><br /> ${donors[key].post} <br /><i class='fa fa-quote-right' style='font-size:60%; color:rgb(18, 165, 165)''></i></p>
                <p id='${key + counter}'><button style='width:100%;' onclick='accept()' class='btn btn-danger'><i class='fa fa-plus-square'></i> Accept Now</button></p>
                <hr />
                            <p class='oD' title='Age'><span style='font-weight:bold'><i class='fa fa-child' style='color:#000000;'></i> Age : </span> ${donors[key].age}</p>
                            <p class='oD' title='Gender'><span style='font-weight:bold'><i class='fa fa-neuter' style='color:#000000;'></i> Gender : </span> ${donors[key].gender}</p>
                            <p class='oD' title='Number'><span style='font-weight:bold'><i class='fa fa-phone' style='color:#000000;'></i> Phone : </span> ${donors[key].number}</p>
                            <p class='oD' title='Email'><span style='font-weight:bold'><i class='fa fa-envelope' style='color:#000000;'></i> Email : </span> ${donors[key].email}</p>
                            <p class='oD' title='Address'><span style='font-weight:bold'><i class='fa fa-map-marker' style='color:#000000;'></i> Address : </span> ${donors[key].address}</p>
                            <hr />
                </div>  
                 `
        }
        if (counter === 0) {
            document.getElementById("donors").innerHTML = `<p class='null' title='Donors Not Found'>There is no acceptor available at the moment.</p>`
        }
    }
}
function editPost() {
    document.getElementById("loaderAcceptor").style.display = 'block';
    var post = document.getElementById("acceptorPost").value;
    let userUid = firebase.auth().currentUser.uid;
    firebase.database().ref("acceptors/" + userUid).once("value").then((data) => {
        let edit = data.val();
        edit.post = post;
        firebase.database().ref("acceptors/" + userUid).set(edit).then(() => {
            document.getElementById("loaderAcceptor").style.display = 'none';
            swal({
                type: 'success',
                title: 'Edited!',
                text: 'Successfully!',
                confirmButtonText: "Ok!",
                confirmButtonColor: "#fa7c6e"
            }).then((result) => {
                if (result.value) {
                    location.reload();
                }
                else {
                    location.reload();
                }
            })
        }).catch((error) => {
            swal({
                type: 'error',
                title: 'Something went wrong!',
                text: error.message,
                confirmButtonColor: "#fa7c6e"
            })
        })

    }).catch((error) => {
        swal({
            type: 'error',
            title: 'Something went wrong!',
            text: error.message,
            confirmButtonColor: "#fa7c6e"
        })
    })

}
function changeAccType() {
    swal({
        type: 'info',
        title: 'Are you sure?',
        text: 'Your type is acceptor right now. If you have to change your account type, We will convert you in User first then you will select your type anything you want. Again Acceptor or May be Donor or Just a User!',
        confirmButtonText: "Convert!",
        confirmButtonColor: "#fa7c6e",
        showCancelButton: true,
        cancelButtonText: "Cancel!",
        cancelButtonColor: "rgb(18, 165, 165)",
    }).then((result) => {
        if (result.value) {
            accPost();
        }

    })
}
function accPost() {
    document.getElementById("mainBox").style.display = 'none';
    document.getElementById("loader").style.display = 'block';
    let user = firebase.auth().currentUser.uid;
    firebase.database().ref("users/" + user).once("value").then((data) => {
        const dataObj = data.val();
        dataObj.type = "User";
        firebase.database().ref("users/" + user).set(dataObj).then(() => {
            firebase.database().ref("acceptors/" + user).remove().then(() => {
                location = './panel.html';
            }).catch((error) => {
                document.getElementById("mainBox").style.display = 'block';
                document.getElementById("loader").style.display = 'none';
                swal({
                    type: 'error',
                    title: 'Something went wrong!',
                    text: error.message,
                    confirmButtonColor: "#fa7c6e"
                })
            })
        }).catch((error) => {
            document.getElementById("mainBox").style.display = 'block';
            document.getElementById("loader").style.display = 'none';
            swal({
                type: 'error',
                title: 'Something went wrong!',
                text: error.message,
                confirmButtonColor: "#fa7c6e"
            })
        })
    }).catch((error) => {
        document.getElementById("mainBox").style.display = 'block';
        document.getElementById("loader").style.display = 'none';
        swal({
            type: 'error',
            title: 'Something went wrong!',
            text: error.message,
            confirmButtonColor: "#fa7c6e"
        })
    })
}

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
var Btype = "";
async function load() {
    var userId= 'bhFciE70hPfZP4lSb6MTDF36mDG2'
    await firebase.auth().onAuthStateChanged(function (user) {
        
        if (user) {
          //  var userId = firebase.auth().currentUser.uid;
           
            firebase.database().ref("users/" + userId).once("value").then((data) => {
                document.getElementById("loader").style.display = 'none';
                let alert = data.val();
                document.getElementById("profilePic").setAttribute("src", alert.profilePic)
               
                document.getElementById("userName").innerHTML = alert.name;
                document.getElementById("userage").innerHTML = alert.age;
                 
                document.getElementById("userphone").innerHTML = alert.number;
                document.getElementById("userType").innerHTML =  alert.email;
                document.getElementById("mainBox").style.display = 'block';
                document.getElementById("profileP").innerHTML = ` 
                
                    <p class='dp' title='Profile'><img src='${alert.profilePic}' height='20px' width='20px'></p>
                    <p class='name' title='Name'>${alert.name}</p>

                    <p class='name' title='Name'>${alert.name}</p>
                   
                  
                    <div style='text-align:left'>
                        <p><span title='Age' style='font-weight:bold'><i class='fa fa-child' style='color:rgb(73, 209, 134);'></i> Age : </span> ${alert.age}</p>
                        <p><span title='Gender' style='font-weight:bold'><i class='fa fa-neuter' style='color:rgb(73, 209, 134);'></i> Gender : </span> ${alert.gender}</p>
                        <p><span title='Number' style='font-weight:bold'><i class='fa fa-phone' style='color:rgb(73, 209, 134);'></i> Phone : </span> ${alert.number}</p>
                        <p><span title='Email' style='font-weight:bold'><i class='fa fa-envelope' style='color:rgb(73, 209, 134);'></i> Email : </span> ${alert.email}</p>
                        <p><span title='Address' style='font-weight:bold'><i class='fa fa-map-marker' style='color:rgb(73, 209, 134);'></i> Address : </span> ${alert.address}</p>
                    </div>
                    
                `;
               
               
                document.getElementById("profile").innerHTML = `
                    <p class='typeBox' title='Type'><i class='fa fa-user-plus'></i> DOCTOR</p>
                    <p class='dp' title='Profile'><img src='${alert.profilePic}'></p>
                    <p class='name' title='Name'>${alert.name}</p>
                   
                    <div style='text-align:left'>
                        <p><span title='Age' style='font-weight:bold'><i class='fa fa-child' style='color:rgb(73, 209, 134);'></i> Age : </span> ${alert.age}</p>
                        <p><span title='Gender' style='font-weight:bold'><i class='fa fa-neuter' style='color:rgb(73, 209, 134);'></i> Gender : </span> ${alert.gender}</p>
                        <p><span title='Number' style='font-weight:bold'><i class='fa fa-phone' style='color:rgb(73, 209, 134);'></i> Phone : </span> ${alert.number}</p>
                        <p><span title='Email' style='font-weight:bold'><i class='fa fa-envelope' style='color:rgb(73, 209, 134);'></i> Email : </span> ${alert.email}</p>
                        <p><span title='Address' style='font-weight:bold'><i class='fa fa-map-marker' style='color:rgb(73, 209, 134);'></i> Address : </span> ${alert.address}</p>
                    </div>
                    <hr />
                `
                 
            }).catch((error) => {
                
            }) 
            firebase.database().ref("donors/" + userId).once("value").then((data) => {
                let post = data.val();
                console.log(post)
                document.getElementById("myPost").innerHTML = `
                        <div class='postBox' id='${userId}'>
                        
                            <p class='typeBox' title='Type'><i class='fa fa-plus-square'></i> Doctors</p>
                            <div class='paddBox'>
                            <p class='dp' title='Dp'><img src='${post.profilePic}' height='100px' width='100px'></p>
                            <p class='name' title='Name'>${post.name}</p>
                           
                            <p class='post' title='Post'>  ${post.post} <br />  </i></p>
                            <hr />
                            <p class='oD' title='Age'><span style='font-weight:bold'><i class='fa fa-child' style='color:rgb(73, 209, 134);'></i> Age : </span> ${post.age}</p>
                            <p class='oD' title='Gender'><span style='font-weight:bold'><i class='fa fa-neuter' style='color:rgb(73, 209, 134);'></i> Gender : </span> ${post.gender}</p>
                            <p class='oD' title='Number'><span style='font-weight:bold'><i class='fa fa-phone' style='color:rgb(73, 209, 134);'></i> Phone : </span> ${post.number}</p>
                            <p class='oD' title='Email'><span style='font-weight:bold'><i class='fa fa-envelope' style='color:rgb(73, 209, 134);'></i> Email : </span> ${post.email}</p>
                            <p class='oD' title='Address'><span style='font-weight:bold'><i class='fa fa-map-marker' style='color:rgb(73, 209, 134);'></i> Address : </span> ${post.address}</p>
                            <hr />
                            <button  class='btn btn-danger dltBtn' title='Edit' data-toggle="modal" style='background-color:rgb(73, 209, 134);'; data-target="#edit"><i class='fa fa-edit'></i> Edit</button>
                            </div>
                            </div>  
                    `
            }).catch((error) => {
                swal({
                    type: 'error',
                    title: 'Something went wrong!',
                    text: error.message,
                    confirmButtonColor: "rgb(73, 209, 134);"
                })
            })
        }
        else {

        }
    })
}
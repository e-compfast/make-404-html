
  function initLogin() { 

  $(function () {

  $("#verified-alert").hide();
  firebase.initializeApp(config);
  const auth = firebase.auth();
  var providerGoogle = new firebase.auth.GoogleAuthProvider();
  var facebookAccount = new firebase.auth.FacebookAuthProvider();

  auth.onAuthStateChanged(function(cek_user) {
  if (cek_user) {
  var user = firebase.auth().currentUser;
  var email= user.email;
  var emailVerified = user.emailVerified;
  if (!emailVerified){
  $("#verified-alert").fadeIn("slow");
  }else{
  // window.location.href = "/";

  $("#main-index").fadeIn("slow");
  $(".login-box").hide();
  $(".logout").fadeIn("slow");

  }
  } else {
  console.log("Status belum diverifikasi");
  // window.location.href = "/p/login.html";
  swal( "Access Denied!" ,  "You must login first" ,  "error" );
  $("#main-index").hide();
  $(".login-box").fadeIn("slow");
  $(".logout").hide();


  }
  });

  $( "#btn-signup" ).click(function(e) {
  e.preventDefault();
  var email = $('#txtEmail-formLogin').val();
  var password = $('#txtPassword-formLogin').val();
  auth.createUserWithEmailAndPassword(email, password).then(function () {
  console.log("Pendaftaran Berhasil");
  var user = auth.currentUser;
  user.sendEmailVerification().then(function() {
  swal("Verification Email", "Buka e-mail anda untuk melakukan proses verifikasi akun pendaftaran", "success");
  logout();
  }, function(error) {
  swal ( "Oops" ,  "Verifikasi e-mail tidak terkirim" ,  "error" )
  });
  }).catch(function(error) {
  var errorCode = error.code;
  var errorMessage = error.message;
  if(error != null){
  $( ".field-login-password" ).addClass( "has-error" );
  $( ".field-login-email" ).addClass( "has-error" );
  $( ".field-login-email>.help-block" ).html( errorCode );
  }
  });
  });

  $( "#btn-signin" ).click(function(e) {
  e.preventDefault();
  var email = $('#txtEmail-formLogin').val();
  var password = $('#txtPassword-formLogin').val();
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  var errorCode = error.code;
  var errorMessage = error.message;
  $( ".field-login-password" ).addClass( "has-error" );
  $( ".field-login-email" ).addClass( "has-error" );
  $( ".field-login-email>.help-block" ).html( errorCode );
  });
  });


  $( ".logout" ).click(function(e) {
  logout();
  });

  $( "#btn-login-google" ).click(function(e) {
  e.preventDefault();
  firebase.auth()

  .signInWithPopup(providerGoogle).then(function(result) {
  var token = result.credential.accessToken;
  var user = result.user;

  console.log(token)
  console.log(user)
  }).catch(function(error) {
  var errorCode = error.code;
  var errorMessage = error.message;

  console.log(error.code)
  console.log(error.message)
  });
  });

  $( "#btn-login-facebook" ).click(function(e) {
  e.preventDefault();
  firebase.auth()

  .signInWithPopup(facebookAccount).then(function(result) {
  var token = result.credential.accessToken;
  var user = result.user;

  console.log(token)
  console.log(user)

  //window.location.href = "/";

  $("#main-index").fadeIn("slow");
  $(".login-box").hide();

  console.log("Masuk Facebook Berhasil !");

  }).catch(function(error) {
  var errorCode = error.code;
  var errorMessage = error.message;

  console.log("Masuk Facebook Gagal !");
  console.log(error.code)
  console.log(error.message)
  });
  });

  function logout(){
  firebase.auth().signOut().then(function() {
  console.log("Sign Out Berhasil");
  $("#verified-alert").hide();
  }).catch(function(error) {
  swal ( "Oops" ,  "Something went wrong!" ,  "error" )
  });
  }
  }()); 
  };
  
  var str = $(".tagslist__link").text();
  var cek = "Premium";
  var premi = str.includes(cek);
    if(premi){
     initLogin();
    }
var twLSN = ['e-compfast.blogspot.com','e-compfastdigital.blogspot.com','x-part.blogspot.com','spotmediaplayer.blogspot.com','e-compfastku.blogspot.com'];
var redirectURL = 'https://e-compfast.blogspot.com';
function cekLSN(value,arr){ var status = false; for(var i=0; i<arr.length; i++){ var name = arr[i]; if(name == value){ status = true; break; } } return status; } var hst = window.location.hostname; if(cekLSN(hst, twLSN) == false) { window.location.href = redirectURL; }

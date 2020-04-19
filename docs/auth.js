
var twLSN = ['e-compfast.blogspot.com','e-compfastdigital.blogspot.com','x-part.blogspot.com','spotmediaplayer.blogspot.com','e-compfastku.blogspot.com','e-spotmedia.blogspot.com','e-spotgram.blogspot.com'];
var redirectURL = 'https://e-compfast.blogspot.com';
function cekLSN(value,arr){ var status = false; for(var i=0; i<arr.length; i++){ var name = arr[i]; if(name == value){ status = true; break; } } return status; } var hst = window.location.hostname; if(cekLSN(hst, twLSN) == false) { window.location.href = redirectURL; }
